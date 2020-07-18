import React from 'react';
import {
  CompositeDecorator,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertFromRaw,
  Editor,
  // Modifier,
} from 'draft-js';
// import { stateFromHTML } from 'draft-js-import-html';
import { Image } from 'semantic-ui-react'
import 'draft-js/dist/Draft.css';
import './discussion.css';
import { data } from './sample';

export default class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    const styles = {
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
    function findLinkEntities(contentBlock, callback, contentState) {
      contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      }, callback);
    }

    const Link = (props) => {
      const { url } = props.contentState.getEntity(props.entityKey).getData();
      return (
        <a href={url} style={styles.link}>
          {props.children}
        </a>
      );
    };

    function findImageEntities(contentBlock, callback, contentState) {
      contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'IMAGE'
        );
      }, callback);
    }

    const Image = (props) => {
      const { height, src, width } = props.contentState
        .getEntity(props.entityKey)
        .getData();

      return <img src={src} height={height} width={width} />;
    };
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
      {
        strategy: findImageEntities,
        component: Image,
      },
    ]);

    this.state = {
      editorState: EditorState.createWithContent(
        convertFromRaw(data),
        decorator,
      ),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    // this.handlePastedText = (text, html) => this._handlePastedText(text, html);
    this.handlePastedFiles = (files) => this._handlePastedFiles(files);
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

  // ThemedImage = props => <Image {...props} theme={theme} />;
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

  myBlockRenderer = (block) => {
    if (block.getType() === 'atomic') {
      const contentState = this.state.editorState.getCurrentContent();
      const entity = block.getEntityAt(0);
      if (!entity) return null;
      const type = contentState.getEntity(entity).getType();
      if (type === 'IMAGE' || type === 'image') {
        return {
          component: MediaComponent,
          editable: false,
        };
      }
      return null;
    }

    return null;
  }

  // _handlePastedText = (text, html) => {
  //   // if they try to paste something they shouldn't let's handle it
  //   debugger;
  //   //================
  //   const { editorState } = this.state;
  //   const blockMap = stateFromHTML(html || text /* here */).blockMap;
  //   // const newContent = Modifier.insertText(
  //   //   this.state.editorState.getCurrentContent(),
  //   //   this.state.editorState.getSelection(),
  //   //   blockMap,
  //   // );

  //   // // update our state with the new editor content
  //   // this.onChange(
  //   //   EditorState.push(this.state.editorState, newContent, 'insert-characters'),
  //   // );
  //   // return true;

  //   // ==============

  //   const newState = Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);
  //   this.onChange(EditorState.push(editorState, newState, 'insert-fragment'))
  //   return true
  // };

  _handlePastedFiles = async (files) => {
    const base64 = await this.convertTobase64(files[0]);
    this.insertImage(this.state.editorState, base64);
  }

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
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Submit a Question..."
            ref="editor"
            spellCheck={true}
            blockRendererFn={this.myBlockRenderer}
            // handlePastedText={this.handlePastedText}
            handlePastedFiles={this.handlePastedFiles}
          />
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


class MediaComponent extends React.Component {
  render() {
    const { src } = this.props.contentState.getEntity(this.props.block.getEntityAt(0)).getData();
    // const {block, contentState} = this.props;
    // const {foo} = this.props.blockProps;
    // const data = contentState.getEntity(block.getEntityAt(0)).getData();
    // // Return a <figure> or some other content using this data.
    return (
      <figure>
        <img src={src} />
      </figure>
    )
  }
}