import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {CountdownButton} from "./CountdownButton";


export function Management({reload2}) {

    const [mong, setMong] = useState(null);
    const [reload, setReload] = useState(0);
    const [condition, setCondition] = useState("");

    const toast = useToast();
    const navigate = useNavigate();

    const [countdown, setCountdown] = useState(null);


    useEffect(() => {
        axios.get("/api/manage/mong", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            }
        })
            .then(({data}) => {

                setMong(data);
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


    }, [reload,reload2]);


    if (mong === null) {

        return <div>로딩중</div>;
    }
    if (!mong.name) {
        return <div>몽이 없습니다</div>;
    }



    function handleFeedClick() {
        axios.put("/api/manage/feed", {memberId : mong.memberId})
            .then(()=> {
                console.log("먹이주기");
                axios.post("/api/manage/feed/feedCool", {memberId : mong.memberId})
                    // .then(()=> console.log("쿨타임끝"))
                setReload(reload+1);
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
                axios.post("/api/manage/stroke/strokeCool", {memberId : mong.memberId});
                setReload(reload + 1);
                setCountdown(10);

                const countdownInterval = setInterval(() => {
                    setCountdown((prevCountdown) => {
                        if (prevCountdown <= 1) {
                            clearInterval(countdownInterval);
                            return null;
                        }
                        return prevCountdown - 1;
                    });
                }, 1000);
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
                axios.post("/api/manage/training/trainingCool", {memberId : mong.memberId});
                setReload(reload + 1);
                setCountdown(10);

                const countdownInterval = setInterval(() => {
                    setCountdown((prevCountdown) => {
                        if (prevCountdown <= 1) {
                            clearInterval(countdownInterval);
                            return null;
                        }
                        return prevCountdown - 1;
                    });
                }, 1000);
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

    const handleButtonClick = (buttonNumber) => {
        // 버튼 클릭 시 실행될 로직
        console.log(`Button ${buttonNumber} clicked`);
        // 각 버튼의 상태 업데이트
    };

    function handleCleanClick() {
        axios.put("/api/manage/clean", {memberId : mong.memberId})
            .then(()=> {
                console.log("청소하기");
                setReload(reload+1);
            }).catch(()=> {console.log("맵이 깨끗합니다.")})
    }


    return <div>
        <div style={{display : "flex", justifyContent : "space-between", width : "500px"}}>
            {/* setTimeout을 이용해서 먹이를 준후 랜덤시간 똥싸기 clean false */}
            <CountdownButton
                buttonNumber={1}
                onButtonClick={handleButtonClick}
                reload={reload}
                setReload={setReload}
                memberId={mong.memberId}
                label={"먹이주기"}
            />
            <CountdownButton
                buttonNumber={2}
                onButtonClick={handleButtonClick}
                reload={reload}
                setReload={setReload}
                memberId={mong.memberId}
                label={"쓰다듬기"}

            />
            <CountdownButton
                buttonNumber={3}
                onButtonClick={handleButtonClick}
                reload={reload}
                setReload={setReload}
                memberId={mong.memberId}
                label={"훈련하기"}
            />
            <Button onClick={handleSleepClick}>잠자기</Button>
            {/* clean 이 false 시 활성화 */}
            <Button onClick={handleCleanClick
            }>청소하기</Button>
        </div>
        {mong.clean && <div>맵상태 : clean</div>}
        {mong.clean || <div>맵상태 : dirty</div>}
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