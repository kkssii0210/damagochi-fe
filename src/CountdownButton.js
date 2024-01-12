
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

export function CountdownButton ({ buttonNumber, onButtonClick, memberId }) {
    const [countdown, setCountdown] = useState(null);

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

    const handleButtonClick = () => {
        if (buttonNumber === 1) {
            axios.put("/api/manage/feed", { memberId })
                .then(() => {
                    console.log("먹이주기");
                    axios.post("/api/manage/feed/feedCool", { memberId })
                    // .then(()=> console.log("쿨타임끝"))
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        console.log("포만감이 가득 찼습니다.");
                    } else if (error.response.status === 404) {
                        console.log("쿨타임 중");
                        // 에러가 발생하면 카운트다운을 초기화하지 않음
                        return;
                    }
                });
        }

        // 클릭된 버튼 정보와 함께 부모 컴포넌트에 알림
        onButtonClick(buttonNumber);
        setCountdown(10);
    };

    return (
        <Button onClick={handleButtonClick}>
            {`버튼 ${buttonNumber} (${countdown !== null ? countdown : 0}s)`}
        </Button>
    );
};

export default CountdownButton;