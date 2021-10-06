import React from 'react';
import TypographyHelper from 'react-typography-helper';

export const MyArticle = ({title, body}) => (
    <article>
        <h1><TypographyHelper text={title} widontNonBreakingSpace /></h1>
        <div dangerouslySetInnerHTML={{__html: body}} />
    </article>
);

const e = React.createElement;

// class LikeButton extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { liked: false };
//     }
//
//     render() {
//         if (this.state.liked) {
//             return 'You liked this.';
//         }
//
//         return e(
//             'button',
//             { onClick: () => this.setState({ liked: true }) },
//             'Like'
//         );
//     }
// }

const domContainer = document.querySelector('#my_test');
// ReactDOM.render(e(LikeButton), domContainer);
ReactDOM.render(e(MyArticle("Text to \"fix\"... TM -- ")), domContainer);
