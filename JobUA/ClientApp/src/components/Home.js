import React from 'react';
import './Home.css';

//export class Home extends Component {
//  static displayName = Home.name;

//  render () {
//    return (
//      <div>
//        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
//      </div>
//    );
//  }
//}

export function Home() {

    function setArticle() {

    }

    return (
        <div className="Home">
            <p>Hello222222</p>
            <div>
                <button onClick={() => setArticle()}>Set</button>
            </div>
        </div>
    );
}


