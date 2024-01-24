import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import axios from "axios";

const BattleRoom = () => {
  const [stompClient, setStompClient] = useState(null);
  const [battleRoomId, setBattleRoomId] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [battleRooms, setBattleRooms] = useState([]);

  const connectWebSocket = () => {
    const client = new StompJS.Client({
      webSocketFactory: () => new SockJS("/battle"),
      connectHeaders: {
        accessToken: localStorage.getItem("accessToken"), // 예시
      },
      onConnect: () => {
        setStompClient(client);
        client.subscribe("/topic/battleRoom", (message) => {
          console.log(message);
        });
        createBattleRoom(client); // 웹소켓 연결 후 배틀룸 생성
      },
      onStompError: (error) => {
        console.error(error);
      },
    });

    client.activate();
  };

  const createBattleRoom = (client) => {
    if (client) {
      client.publish({
        destination: "/app/createBattleRoom",
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          /* 배틀룸 생성 데이터 */
        }),
      });
    }
  };
  useEffect(() => {
    axios
      .get("/api/battleRooms")
      .then((response) => {
        setBattleRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching battle rooms:", error);
      });

    // 웹소켓 연결 설정 로직 (생략)
  }, []); // 빈 의존성 배열 사용

  useEffect(() => {
    const client = new StompJS.Client({
      webSocketFactory: () => new SockJS("/battle"),
      connectHeaders: {
        accessToken: localStorage.getItem("accessToken"),
      },
      onConnect: () => {
        console.log("WebSocket Connected");
        client.subscribe("/topic/battleRooms", (message) => {
          console.log(message.body);
          // 서버로부터 받은 배틀룸 목록 데이터 처리
          const updatedRooms = JSON.parse(message.body);
          setBattleRooms(updatedRooms);
        });
      },
      onDisconnect: () => {
        console.log("WebSocket Disconnected");
      },
      onStompError: (error) => {
        console.error("STOMP Error:", error);
      },
    });
    client.activate();
  }, []);

  // // WebSocket 연결 종료
  // useEffect(() => {
  //   // 서버로부터 배틀룸 목록 가져오기
  //   axios
  //     .get("/api/battleRooms")
  //     .then((response) => {
  //       setBattleRooms(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching battle rooms:", error);
  //     });
  //   return () => {
  //     if (stompClient) {
  //       stompClient.deactivate(); // WebSocket 연결 종료
  //     }
  //   };
  // }, [stompClient]); // 의존성 배열에 stompClient 추가

  const joinRoom = (battleRoomId) => {
    const accessToken = localStorage.getItem("accessToken");
    // 웹소켓이 연결되어 있지 않다면 먼저 연결을 시도
    if (!stompClient || !stompClient.connected) {
      const client = new StompJS.Client({
        webSocketFactory: () => new SockJS("/battle"),
        connectHeaders: {
          accessToken: localStorage.getItem("accessToken"),
        },
        onConnect: () => {
          setStompClient(client);
          // 연결이 성공하면 publish를 사용하여 배틀룸 참여 요청을 보냄
          client.publish({
            destination: "/app/createBattleRoom",
            headers: { accessToken },
            body: JSON.stringify({ battleRoomId }),
          });
          setCurrentRoom(battleRoomId); // 현재 참여한 방 설정
        },
        onStompError: (error) => {
          console.error(error);
        },
      });
      client.activate();
    } else {
      // 웹소켓이 이미 연결되어 있으면 publish를 사용하여 참여 요청을 보냄
      stompClient.publish({
        destination: "/app/createBattleRoom",
        headers: { accessToken },
        body: JSON.stringify({ battleRoomId }),
      });
      setCurrentRoom(battleRoomId); // 현재 참여한 방 설정
    }
  };
  // 서버로부터 응답을 받는 부분 구현 필요

  return (
    <div>
      <button onClick={connectWebSocket}>Create Battle Room</button>
      {currentRoom && <div>Current Battle Room ID: {currentRoom}</div>}
      <h2>Available Battle Rooms</h2>
      <ul>
        {battleRooms.map((room) => {
          // 현재 참여 중인 플레이어 수 계산
          const playerCount = Object.values(room.sessionIds).filter(
            (id) => id !== null,
          ).length;
          return (
            <li
              key={room.battleRoomId}
              onClick={() => joinRoom(room.battleRoomId)}
            >
              {room.battleRoomId + "번 방"} - Players: {playerCount}/2
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BattleRoom;
