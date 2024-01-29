import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Button, Drawer, DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {CountdownButton} from "./CountdownButton";
import Step1Damagochi from "../../알.gif";
import Step2Damagochi from "../../자아생성시기.gif";
import Step3Damagochi from "../../사춘기.gif";
import Step4Damagochi from "../../다큼.gif";
import {Inventory} from "./Inventory";

export function Management({reload2}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const [showInventory, setShowInventory] = useState(false)

    const [mong, setMong] = useState(null);
    const [reload, setReload] = useState(0);
    const [condition, setCondition] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [warningMessage, setWarningMessage] = useState("")

    const toast = useToast();
    const navigate = useNavigate();

    const [countdown, setCountdown] = useState(null);
    const [imageModule, setImageModule] = useState(null);




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

                const loadImageModule = async () => {
                    if (data.evolutionLevel >= 2) {
                        const imageModule = await import(`../../img/${data.mongCode}-${data.evolutionLevel-1}.png`);
                        setImageModule(imageModule.default);
                    }
                };

                loadImageModule();
            })


    }, [reload,reload2]);




    if (mong === null) {

        return <div>로딩중</div>;
    }

    function handleAddMongClick() {
        if (inputValue.trim() === '') {
            // 인풋 값이 공백인 경우 경고 메시지 설정
            setWarningMessage('인풋 값을 입력하세요.');
        } else {
            // 공백이 아니면 경고 메시지 초기화하고 Axios 요청 보내기
            setWarningMessage('');
            axios.postForm("/api/mongList", { mongName: inputValue }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })
                .then(() => setReload(reload + 1));
        }
    };
    if (!mong.name) {
        return <div>
            몽이 없습니다
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleAddMongClick}>몽 획득하기</button>
            {warningMessage && <p style={{ color: 'red' }}>{warningMessage}</p>}
        </div>;
    }





    function handleSleepClick() {
        axios.put("/api/manage/sleep", {memberId : mong.memberId})
            .then(() => {
                console.log("잠자기");
                setReload(reload + 1);
                toast({
                    description : "잠자기",
                    status : "success"
                })
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
                toast({
                    description : "청소하기",
                    status : "success"
                })
            }).catch(()=> {console.log("맵이 깨끗합니다.")
            toast({
                description : "맵이 깨끗합니다",
                status : "error"
            })})
    }

    function handleEvolClick() {
        axios.put("/api/manage/mong/evo", {memberId : mong.memberId})
            .then(()=> {
                console.log("진화성공!!");
                setReload(reload+1);
                toast({
                    description : "진화성공",
                    status : "success"
                })
            })
            .catch(()=> {
                console.log("진화실패")
                toast({
                    description : "진화 실패",
                    status : "error"
                })
            })
    }


    function handleInvenButtonClick() {
        setShowInventory(!showInventory)
    }

    const handleInventoryClose = () => {
        setShowInventory(false);
    };

    return <div style={{border : "1px solid red", width : "100%", height : "100%"}}>
        <div style={{display : "flex"}}>
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
            {!mong.clean &&
                <Button onClick={handleCleanClick}>청소하기</Button>
                }
            {(mong.level >= 1 && mong.evolutionLevel === 1) && <Button onClick={handleEvolClick}>진화</Button>}
            {(mong.level >= 4 && mong.evolutionLevel === 2) && <Button onClick={handleEvolClick}>진화</Button>}
            {(mong.level >= 8 && mong.evolutionLevel === 3) && <Button onClick={handleEvolClick}>진화</Button>}
            <div>
                <Button onClick={handleInvenButtonClick}>
                    인벤토리
                </Button>
                {showInventory && <Inventory memberId={mong.memberId} onClose={handleInventoryClose}/>}
            </div>
        </div>
        {mong.clean && <div>맵상태 : clean</div>}
        {mong.clean || <div>맵상태 : dirty</div>}
        <div style={{display : "flex"}}>
        <div style={{ width: "300px", height: "300px" }}>
            {mong.evolutionLevel === 1 && <img src={Step1Damagochi} alt={"Step1"} />}
            {mong.evolutionLevel !== 1 && imageModule && (
                <img style={{height : "100%", width : "100%"}}
                    src={imageModule}
                    alt={`step${mong.evolutionLevel}`}
                />
            )}
        </div>
        <div style={{ border : "1px solid black"}}>
            <div>이름 : {mong.name}</div>
            <div>속성 : {mong.attribute}</div>
            <div>레벨 : {mong.level}</div>
            <div>진화레벨 : {mong.evolutionLevel }</div>
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
        </div>
    </div>;
}