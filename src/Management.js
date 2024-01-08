import {useEffect, useState} from "react";
import axios from "axios";
import {Button, useToast} from "@chakra-ui/react";

export function Management() {

    const [mong, setMong] = useState(null);
    const [reload, setReload] = useState(0);
    const [condition, setCondition] = useState("");

    const toast = useToast();

    const socket = new WebSocket('ws://172.30.1.35:3000/management');

    socket.addEventListener('open', (event) => {
        console.log('WebSocket 연결이 열렸습니다.');

        // '/topic/management' 주제를 구독
        socket.send(JSON.stringify({
            type: 'subscribe',
            destination: '/topic/management'
        }));
    });

    socket.addEventListener('message', (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log('받은 메시지:', receivedMessage);

        // TODO: 메시지를 받아서 원하는 동작 수행
    });

    socket.addEventListener('close', (event) => {
        console.log('WebSocket 연결이 닫혔습니다.');
    });

    socket.addEventListener('error', (event) => {
        console.error('WebSocket 에러:', event);
    });


    useEffect(() => {
        axios.get("/api/manage/mong")
            .then(({data}) => {
                setMong(data)
                if (data.tired <= 50) {
                    setCondition("졸림");
                } else if (data.feed <= 50) {
                    setCondition("배고픔")
                } else if (data.tired >= 80 && data.feed >= 80) {
                    setCondition("신남")
                } else {
                    setCondition("보통")
                }
            })

    }, [reload]);




    if (mong === null) {
        return <div>로딩중</div>
    }



    function handleFeedClick() {
        axios.put("/api/manage/feed", {memberId : mong.memberId})
            .then(()=> {
                console.log("먹이주기");
                axios.post("/api/manage/feed/feedCool")
                setReload(reload + 1);
            })
            .catch((error)=> {
                if (error.response.status === 400) {
                    console.log("포만감이 가득 찼습니다.")
                } else if (error.response.status === 404) {
                    console.log("쿨타임 중")
                }
            })
    }

    function handleStrokeClick() {
        axios.put("/api/manage/stroke", {memberId : mong.memberId})
            .then(()=> {
                console.log("쓰다듬기")
                axios.post("/api/manage/stroke/strokeCool");
                setReload(reload + 1);
            })
            .catch((error)=> {
                if (error.response.status === 400) {
                    console.log("피로도가 가득 찼습니다.")
                } else if (error.response.status === 404) {
                    console.log("쿨타임 중")
                }
            })
    }

    function handleTrainigClick() {
        axios.put("/api/manage/training", {memberId : mong.memberId})
            .then(({data})=> {
                console.log(data);
                axios.post("/api/manage/training/trainingCool");
                setReload(reload + 1);
            })
            .catch((error)=> {
                if (error.response.status === 400) {
                    console.log("피로도가 없습니다.")
                } else if (error.response.status === 404) {
                    console.log("쿨타임 중")
                }
            })
    }

    function handleSleepClick() {
        axios.put("/api/manage/sleep", {memberId : mong.memberId})
            .then(() => {
                console.log("잠자기");
                setReload(reload + 1);
            })
    }

    return <div>
        <div style={{display : "flex", justifyContent : "space-between", width : "500px"}}>
            {/* setTimeout을 이용해서 먹이를 준후 랜덤시간 똥싸기 clean false */}
            <Button onClick={handleFeedClick}>먹이주기</Button>
            <Button onClick={handleStrokeClick}>쓰다듬기</Button>
            <Button onClick={handleTrainigClick}>훈련하기</Button>
            <Button onClick={handleSleepClick}>잠자기</Button>
            {/* clean 이 false 시 활성화 */}
            <Button>청소하기</Button>
        </div>
        <div style={{marginTop : "50px"}}>
            <div>이름 : {mong.name}</div>
            <div>속성 : {mong.attribute}</div>
            <div>레벨 : {mong.level}</div>
            <div>경험치 : {mong.exp}</div>
            {/* 아픔 디버프가 있다면 상태에 같이 표시 */}
            <div>상태 : {condition}</div>
            <div>포만감 : {mong.feed}</div>
            <div>피로도 : {mong.tired}</div>
            <div>근력 : {mong.strength}</div>
            <div>민첩 : {mong.agility}</div>
            <div>방어력 : {mong.defense}</div>
            <div>체력 : {mong.health}</div>
        </div>
    </div>;
}