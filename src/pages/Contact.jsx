import ProfileCard from "../components/ProfileCard/ProfileCard";
import Orb from "../components/Orb/Orb";

const Contact = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh', // đảm bảo chiếm toàn màn hình
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}// display +... để cho 2 cái ở giữa
    >
      <div
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Orb
          hoverIntensity={0.6}
          rotateOnHover={true}
          hue={-6}
          forceHoverState={false}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
        }}// absolute/fixed (z-index cao) để có thể chồng lên, không chiếm k gian
      >

        <ProfileCard
          name="Vu Xuan Hung"
          handle="vuxuanhung"
          status="Online"
          contactText="Contact Me"
          avatarUrl="c.png"
          miniAvatarUrl="1.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={true}
          onContactClick={() =>
            window.open("https://www.facebook.com/vu.xuan.hung.883474", "_blank")
          }
        />

      </div>
    </div>


  );
}
export default Contact;