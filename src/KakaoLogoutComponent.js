import {getKakaoLogoutLink} from "./page/api/kakaoApi";
import {Button} from "@chakra-ui/react";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const KakaoLogoutComponent = () => {
    const link = getKakaoLogoutLink();
    const handleLogoutClick = () => {
        // 버튼 클릭 시 link로 이동
        window.location.href = link;
    };
    return (
        <Button href={link}
                variant="ghost"
                size="lg"
                fontFamily="Constantia"
                border="0px solid red"
                onClick={handleLogoutClick}
                _hover={{ bg: "none" }}
                >
            <FontAwesomeIcon icon={faRightFromBracket} />log out
        </Button>
    )
}
export default KakaoLogoutComponent;