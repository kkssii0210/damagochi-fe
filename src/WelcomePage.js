import styles from './WelcomePage.module.css'
import TamagotchiImage from './다마고찌1.gif'
export function WelcomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Damagochi</div>
      {/* 'character.png'는 public 폴더 내부 또는 src 폴더 내부의 경로일 수 있습니다. */}
      <img src={TamagotchiImage} alt="캐릭터" className={styles.character}/>
      <button className={styles.button}>시작하기</button>
    </div>
  );
}