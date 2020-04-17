import React, { Component } from 'react';
import { CompositeDecorator, ContentBlock, convertFromHTML, convertToRaw, ContentState, Editor, EditorState } from 'draft-js';

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  }

  const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} style={styles.link}>
        {props.children}
      </a>
    );
  };

  function findImageEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'IMAGE'
        );
      },
      callback
    );
  }

  const Image = (props) => {
    const {
      height,
      src,
      width,
    } = props.contentState.getEntity(props.entityKey).getData();

    return (
      <img src={src} height={height} width={width} />
    );
  };

  const styles = {
    root: {
      fontFamily: '\'Helvetica\', sans-serif',
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

class RichTextEditor extends Component{
    constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
        };
      }

    onChange=(editorState) => {
        this.setState({editorState});
    }

    textFromRawContent = () =>{
        const content = this.state.editorState.getCurrentContent();
        const blocks = convertToRaw(content).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        return value;
    }

    logState = () => {
        const value = this.textFromRawContent();
        console.log(value);
    }

    convertHtml = () =>{
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
          const sampleMarkup = this.textFromRawContent();
          const blocksFromHTML = convertFromHTML(sampleMarkup);
          const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
          );
          this.onChange(EditorState.createWithContent(
            state,
            decorator,
          ));
    }

    render() {
        return (
            <div>
                <button onClick={this.logState}>Log</button>
                <button onClick={this.convertHtml}>Convert Html</button>
                <Editor 
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                />
            </div>
        );
      }
};

export default RichTextEditor;