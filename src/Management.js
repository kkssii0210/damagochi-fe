import {useEffect, useState} from "react";
import axios from "axios";

export function Management() {

    const [mong, setMong] = useState(null)

    useEffect(() => {
        axios.get("/api/manage/mong")
            .then(({data}) => setMong(data))
    }, []);


    if (mong === null) {
        return <div>로딩중</div>
    }

    function handleFeedClick() {
        axios.post("/api/manage/mong/feed", {memberId : mong.memberId})
            .then(()=> console.log("먹이주기"))
    }

    return <div>
        <div style={{display : "flex", justifyContent : "space-between", width : "500px"}}>
            {/* setTimeout을 이용해서 먹이를 준후 랜덤시간 똥싸기 clean false */}
            <div onClick={handleFeedClick}>먹이주기</div>
            <div>쓰다듬기</div>
            <div>훈련하기</div>
            <div>잠자기</div>
            {/* clean 이 false 시 활성화 */}
            <div>청소</div>
        </div>
        <div style={{marginTop : "50px"}}>
            <div>이름 : {mong.name}</div>
            <div>속성 : {mong.attribute}</div>
            <div>레벨 : {mong.level}</div>
            <div>경험치 : {mong.exp}</div>
            {/* 아픔 디버프가 있다면 상태에 같이 표시 */}
            <div>상태 : {mong.status}</div>
            <div>포만감 : {mong.feed}</div>
            <div>피로도 : {mong.tired}</div>
            <div>근력 : {mong.strength}</div>
            <div>민첩 : {mong.agility}</div>
            <div>방어력 : {mong.defense}</div>
            <div>체력 : {mong.health}</div>
        </div>
    </div>;
}