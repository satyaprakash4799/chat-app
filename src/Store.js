import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();

/* 
    {
        from: "user",
        msg: "hi",
        topic: "general"
    }

    state: {
        topic1 : [
            [msg, msg]
        ],
        topic2 : [
            [msg, msg]
        ]
    }



*/

function reducer(state,action ) {
    const { from, msg, topic } = action.payload ;
    switch(action.type) {
        case "RECEIVE_MESSAGE":
            return {
                ...state,
                [topic] : [
                    ...state[topic],
                    {
                        from : from,
                        msg: msg
                    }
                ]

                
            }

        default: 
            return state;
    }
}

const initState = {
    general : [
        { from: 'A', msg: 'Abc'},
        { from: 'B', msg: 'Bcd'},
        { from: 'C', msg: 'Cde'}
    ],
    topic2 : [
        { from: 'X', msg: 'Xyz'},
        { from: 'Y', msg: 'Yzz'},
        { from: 'Z', msg: 'Zaa'}
    ],
    
}



let socket;
function sendChatAction(value ) {
    if(socket)socket.emit(`chat message`, value);
}

export default function Store(props) {
    const [allChats, dispatch] = React.useReducer(reducer, initState);
    if(!socket) {
        socket = io('http://localhost:3001');
        socket.on('chat message', function(msg){
            dispatch({
                type: "RECEIVE_MESSAGE",
                payload: msg
            })
        })
    }
    const user = 'Satya' + Math.random(100).toFixed(2);
    
    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}