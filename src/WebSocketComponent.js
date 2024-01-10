import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import {Button} from "@chakra-ui/react";

const WebSocketComponent = ({ onMessageReceived }) => {
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(function(){
            return new SockJS('http://localhost:8080/ws')
        });

        const onConnect = () => {
            console.log('WebSocket에 연결되었습니다.');
            setStompClient(stomp);

            stomp.subscribe('/topic/management', onMessage)
        };

        const onMessage = (msg) => {
            console.log('메시지를 받았습니다:', msg.body);
            onMessageReceived(msg.body);


        };

        socket.onopen = () => {
            stomp.connect({}, onConnect);
        };

        socket.onmessage = (event) => {
            stomp.onMessage(event);
        };

        return () => {
            if (stomp.connected) {
                stomp.disconnect();
            }
            if (socket.readyState === SockJS.OPEN) {
                socket.close();
            }
        };
    }, [onMessageReceived]);

    if (!stompClient || !stompClient.connected) {
        return <div>머야이ㅓㄴ</div>;
    }

    function handleASDClick() {
        stompClient.send("/management", {}, JSON.stringify({message: "add"}))
    }

    return <Button onClick={handleASDClick}>asd</Button>;
};

export default WebSocketComponent;
