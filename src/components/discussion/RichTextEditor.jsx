import React from 'react';
import {
  CompositeDecorator,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertFromRaw,
  Modifier,
  convertToRaw,
} from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import 'draft-js/dist/Draft.css';
import './discussion.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import { geteditorData } from '../../common/Repositories/discussionRepository';

const emojiPlugin = createEmojiPlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });
const { EmojiSuggestions } = emojiPlugin;
const { AlignmentTool } = alignmentPlugin;
const plugins = [
  emojiPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
];

export default class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.focus = () => this.editor.focus();
    this.onChange = (editorState) =>
      this.setState({ editorState }, () => {
        this.logState();
      });
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.handlePastedText = (text, html) => this._handlePastedText(text, html);
  }

  styles = {
    root: {
      fontFamily: "'Helvetica', sans-serif",
      padding: 20,
      width: 600,
    },
    editor: {
      border: '1px solid #ccc',
      cursor: 'text',
      minHeight: 80,
      padding: 10,
    },
    button: {
      marginTop: 10,
      textAlign: 'center',
    },
  };
  findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    }, callback);
  }

  Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} style={this.styles.link}>
        {props.children}
      </a>
    );
  };

  findImageEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'IMAGE'
      );
    }, callback);
  }

  Image = (props) => {
    const { height, src, width } = props.contentState
      .getEntity(props.entityKey)
      .getData();

    return <img src={src} height={height} width={width} />;
  };

  decorator = new CompositeDecorator([
    {
      strategy: this.findLinkEntities,
      component: this.Link,
    },
    {
      strategy: this.findImageEntities,
      component: this.Image,
    },
  ]);

  async componentDidMount() {
    if (this.props.rectangels) {
      let convertedData = await geteditorData({
        image_path: this.props.imagepath,
        rectangels: this.props.rectangels,
        max_width: this.props.transformImagewidth,
      });
      if (convertedData) {
        const contentState = convertFromRaw(convertedData);
        this.setState(
          {
            editorState: EditorState.createWithContent(
              contentState,
              this.decorator,
            ),
          },
          () => this.logState(),
        );
      }
    }
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  logState = () => {
    const content = this.state.editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    console.log(rawContent);
  };
  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle),
    );
  }
  handleClick = () => {
    const input = document.getElementById('imgupload');
    if (input) {
      input.click();
    }
  };

  insertImage(editorState, base64) {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: base64 },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    this.onChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
    );
  }

  addImage = async (event) => {
    const base64 = await this.convertTobase64(event.target.files[0]);
    this.insertImage(this.state.editorState, base64);
  };

  convertTobase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        resolve(reader.result);
      };
      reader.onerror = function(error) {
        reject(error);
      };
    });
  };

  //   _handlePastedText(text, html, editorState) {
  //     this._handleChange(
  //       EditorState.push(
  //         this.state.editorState,
  //         Modifier.replaceText(
  //           this.state.editorState.getCurrentContent(),
  //           this.state.editorState.getSelection(),
  //           text.replace(/\n/g, ' '),
  //         ),
  //       ),
  //     );
  //     return 'handled';
  //   }
  //   _handleChange = (editorState) => {
  //     this.setState({ editorState });
  //   };
  _handlePastedText = (text, html) => {
    // if they try to paste something they shouldn't let's handle it
    const blockMap = stateFromHTML(html).blockMap;
    const newContent = Modifier.insertText(
      this.state.editorState.getCurrentContent(),
      this.state.editorState.getSelection(),
      blockMap,
    );

    // update our state with the new editor content
    this.onChange(
      EditorState.push(this.state.editorState, newContent, 'insert-characters'),
    );
    return true;
  };

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />

        <InlineStyleControls
          handleClick={this.handleClick}
          addImage={this.addImage}
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />

        <div className={className} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
            handleDroppedFiles={this.handlePastedText}
          />
          <EmojiSuggestions />
          {/* <AlignmentTool /> */}
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
      <i
        onClick={props.handleClick}
        aria-hidden="true"
        style={{
          color: 'black',
          fontSize: 'large',
        }}
        className="image outline link icon"
      ></i>
      <input
        hidden
        type="file"
        id="imgupload"
        name="img"
        accept="image/*"
        onChange={props.addImage.bind(this)}
      ></input>
    </div>
  );
};
