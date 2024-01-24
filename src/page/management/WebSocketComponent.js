import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import {Button} from "@chakra-ui/react";
import {Management} from "./Management";
import {useNavigate} from "react-router-dom";

const WebSocketComponent = () => {
    const [stompClient, setStompClient] = useState(null);
    const [reload2, setReload2] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(function(){
            return new SockJS('http://localhost:8080/ws')
        });


        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        }

        const onConnect = () => {
            console.log('WebSocket에 연결되었습니다.');
            setStompClient(stomp);

            stomp.subscribe('/topic/management', onMessage)
        };

        const onMessage = (msg) => {
            console.log('메시지를 받았습니다:', msg.body);
            setReload2(reload2+1);
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
    }, []);

    if (!stompClient || !stompClient.connected) {
        return <div>머야이ㅓㄴ</div>;
    }


    return <Management reload2={reload2} />;
};

export default WebSocketComponent;
