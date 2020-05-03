import React, { Component } from 'react';
import { CompositeDecorator, ContentBlock, convertFromHTML, convertToRaw, ContentState, Editor, EditorState, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

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
          editorJsonContent: 'default',
          input: ""
        };
      }

    onChange=(editorState)=> {
        this.setState({editorState});
        this.setState({editorJsonContent: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, 2)})
    }

    textFromRawContent=()=> {
        const content = this.state.editorState.getCurrentContent();
        const blocks = convertToRaw(content).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        return value;
    }

    logState= () => {
        const rawContent = this.textFromRawContent();
        console.log(rawContent);
        this.setState({editorJsonContent: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, 2)})
    }

    convertHtml=() => {
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
          const apiArg = {"image_path":this.state.input};
          const apiUrl = "http://127.0.0.1:8080/ocr"
          fetch(apiUrl, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiArg),
          }).then(res=>res.json())
          .then(data=>{
            const rawState = data;
            const contentState = convertFromRaw(rawState.content);
            this.onChange(EditorState.createWithContent(
              contentState,
              decorator,
            ));
            return rawState;
          }).catch(err=>{ console.error(err) });
    }
    
    render() {
        return (
          <>
            <button onClick={this.logState}>Log</button>
            <input type="text" value={this.state.input} onInput={e => this.setState({input:e.target.value})}></input>
            <button onClick={this.convertHtml}>Convert Html</button>
            <div style={{width:'50%', border: '1px dashed #ccc'}}>
                <Editor 
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                />
            </div>
            <div style={{width:'48%', float:'right', border: '1px dashed #ccc'}}>
              <pre>{this.state.editorJsonContent}</pre>
            </div>
            </>
        );
      }
};

export default RichTextEditor;