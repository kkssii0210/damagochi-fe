import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Box,
    Button, Center, Drawer, DrawerBody,
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
import fireAtt from "../../img/fireAtt.png";
import warterAtt from "../../img/waterAtt.png";
import elecAtt from "../../img/elecAtt.png";
import bg from "../../img/bg.jpg";
import food from "../../img/food.png"
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

    const [imgSrc, setImgSrc] = useState("");




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

                if (data.attribute === "물") {
                    setImgSrc(warterAtt);
                } else if (data.attribute === "불") {
                    setImgSrc(fireAtt)
                } else if (data.attribute === "전기") {
                    setImgSrc(elecAtt)
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

    return <Center width={"100%"} height={"80vh"} >
    <Box style={{ width : "60%", height : "70%", display : "flex", justifyContent:"space-between "}} borderRadius="md"
         boxShadow="sm">
        <div style={{width : "60%", background : `url(${bg})`, backgroundSize: 'cover', // 배경 이미지를 가로와 세로가 꽉 차게 설정
            backgroundPosition: 'center'}}>
        <div style={{display : "flex", width : "100%", marginLeft : "5px", marginTop : "5px"}}>
            {/* setTimeout을 이용해서 먹이를 준후 랜덤시간 똥싸기 clean false */}
            <CountdownButton
                buttonNumber={1}
                onButtonClick={handleButtonClick}
                reload={reload}
                setReload={setReload}
                memberId={mong.memberId}
                label={"먹이주기"}
            />
            <div style={{ marginRight: "5px" }}></div>
            <CountdownButton
                buttonNumber={2}
                onButtonClick={handleButtonClick}
                reload={reload}
                setReload={setReload}
                memberId={mong.memberId}
                label={"쓰다듬기"}

            />
            <div style={{ marginRight: "5px" }}></div>
            <CountdownButton
                buttonNumber={3}
                onButtonClick={handleButtonClick}
                reload={reload}
                setReload={setReload}
                memberId={mong.memberId}
                label={"훈련하기"}
            />
            <div style={{ marginRight: "5px" }}></div>
            <Button onClick={handleSleepClick}>잠자기</Button>
            <div style={{ marginRight: "5px" }}></div>
            {!mong.clean &&
                <Button onClick={handleCleanClick}>청소하기</Button>
                }
            {(mong.level >= 1 && mong.evolutionLevel === 1) && <Button onClick={handleEvolClick}>진화</Button>}
            {(mong.level >= 4 && mong.evolutionLevel === 2) && <Button onClick={handleEvolClick}>진화</Button>}
            {(mong.level >= 8 && mong.evolutionLevel === 3) && <Button onClick={handleEvolClick}>진화</Button>}
            {/*<div>*/}
            {/*    <Button onClick={handleInvenButtonClick}>*/}
            {/*        인벤토리*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </div>
            <div style={{width : "100%", height : "100%", display : "flex"}}>
            <div style={{ width: "60%", height: "90%" }}>
                {mong.evolutionLevel === 1 && <img src={Step1Damagochi} alt={"Step1"} style={{ width: "60%", height: "90%" }}/>}
                {mong.evolutionLevel !== 1 && imageModule && (
                    <img style={{height : "100%", width : "100%"}}
                         src={imageModule}
                         alt={`step${mong.evolutionLevel}`}
                    />
                )}
            </div>
                {mong.clean ||
                <div style={{width : "30%", height : "30%", marginTop : "300px"}}>
                    <img src={food} alt="" style={{width : "100%", height : "100%"}}/>
                </div>
                }
            </div>
        </div>
        <div style={{ height:"100%", width:"40%", background : "lightblue", padding : "5px", boxSizing: "border-box"}}>
            <div style={{ height : "10%", fontSize : "1.5rem", display : "flex", justifyContent : "space-between"}}>
                <div>
                    이름 : {mong.name}
                </div>
                <div style={{width : "13%"}}>
                    <img src={imgSrc} alt="attribute" style={{width : "100%", height : "100%"}}/>
                </div>
            </div>
            <div style={{ height : "5%"}}>속성 : {mong.attribute}</div>
            <div style={{ height : "5%"}}>레벨 : {mong.level}</div>
            <div style={{ height : "5%"}}>경험치 : {mong.exp} / 100</div>
            {/* 아픔 디버프가 있다면 상태에 같이 표시 */}
            <div style={{ height : "5%"}}>상태 : {condition}</div>
            <div style={{ height : "5%"}}>포만감 : {mong.feed}</div>
            <div style={{ height : "5%"}}>피로도 : {mong.tired}</div>
            <Inventory mystyle={{border : "1px solid green", height : "60%"}} memberId={mong.id} onClose={handleInventoryClose}/>
        </div>

    </Box>
    </Center>;
}