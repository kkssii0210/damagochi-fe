import {useEffect, useState} from "react";
import axios from "axios";
import Step1Damagochi from "../../알.gif";
import {Box, Button, CloseButton, SimpleGrid} from "@chakra-ui/react";


export function Inventory({memberId, mystyle, onClick, onClose}) {
    const [items, setItems] = useState(null);
    const [reload, setReload] = useState(0);


    useEffect(() => {
        axios.get("/api/inventory?memberId=" + memberId)
            .then(({data}) => setItems(data));
    }, [reload]);

    const handleClickDefault = (item) => {
        if (onClick) {
            onClick(item);
        } else {
            console.log(item.name + " 보기");
        }
        setReload(reload + 1);
    }

    const handleClick = onClick || handleClickDefault;


    if (items === null) {
        return <div>로딩중...</div>
    }
    return <Box style={mystyle} borderRadius="md"
                boxShadow="sm">
        <div style={{background : "lightblue", width : "100%", height : "100%"}}>
        <h1>인벤토리</h1>
        <SimpleGrid columns={3} spacing={10} mt={"15px"} style={{overflow : "hidden"}}>
            {items.map((item) => (
                <div key={item.id} style={{ width: "100%", marginBottom: "20px", position: "relative" }}
                     onClick={()=>handleClick(item)}
                >
                    <img src={Step1Damagochi} alt={item.name} style={{ width: "70%", height: "auto" }} />
                    <div style={{ position: "absolute", bottom: "20px", right: "5px", background: "rgba(0,0,0,0.7)", color: "white", padding: "5px", borderRadius: "5px" }}>
                        <span style={{ marginRight: "3px" }}>{item.quantity}</span>
                    </div>
                    <p style={{ textAlign: "center", marginTop: "5px" }}>{item.name}</p>
                </div>
            ))}
        </SimpleGrid>
    </div>
    </Box>
        ;
}