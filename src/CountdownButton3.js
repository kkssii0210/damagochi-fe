
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

export function CountdownButton3 ({ buttonNumber, onButtonClick, memberId, label, setReload, reload }) {
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        let countdownInterval;

        if (countdown !== null) {
            countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        onButtonClick(buttonNumber); // 클릭된 버튼의 정보 전달
                        return null;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(countdownInterval);
        };
    }, [countdown, onButtonClick, buttonNumber]);

    const handleButtonClick = async () => {
        if (buttonNumber === 1) {
            axios.put("/api/manage/feed", { memberId })
                .then(() => {
                    console.log("먹이주기");
                    axios.post("/api/manage/feed/feedCool", { memberId });
                    setReload(reload+1);
                    // .then(()=> console.log("쿨타임끝"))
                    onButtonClick(buttonNumber);
                    setCountdown(10);
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        console.log("포만감이 가득 찼습니다.");
                    } else if (error.response.status === 404) {
                        console.log("쿨타임 중");
                        // 에러가 발생하면 카운트다운을 초기화하지 않음
                    }
                });
        }

        if (buttonNumber === 2) {
            axios.put("/api/manage/stroke", {memberId})
                .then(()=> {
                    console.log("쓰다듬기")
                    axios.post("/api/manage/stroke/strokeCool", {memberId});

                    onButtonClick(buttonNumber);
                    setCountdown(10);
                })
                .catch((error)=> {
                    if (error.response.status === 400) {
                        console.log("피로도가 가득 찼습니다.")
                    } else if (error.response.status === 404) {
                        console.log("쿨타임 중")
                    }
                })
        }

        if (buttonNumber === 3) {
            axios.put("/api/manage/training", {memberId})
                .then(({data})=> {
                    console.log(data);
                    axios.post("/api/manage/training/trainingCool", {memberId});

                    onButtonClick(buttonNumber);
                    setCountdown(10);
                })
                .catch((error)=> {
                    if (error.response.status === 400) {
                        console.log("피로도가 없습니다.")
                    } else if (error.response.status === 404) {
                        console.log("쿨타임 중")
                    }
                })
        }


    };

    return (
        <Button onClick={handleButtonClick}>
            {`${label} (${countdown !== null ? countdown : 0}s)`}
        </Button>
    );
}
