import ProfileCard from "../components/ProfileCard/ProfileCard";


const Contact = () => {

  return (
    <ProfileCard
      name="Vu Xuan Hung"
      title="Software Engineer"
      handle="vuxuanhung"
      status="Online"
      contactText="Contact Me"
      avatarUrl="c.png"
      miniAvatarUrl="1.jpg"
      showUserInfo={true}
      enableTilt={true}
      enableMobileTilt={true}
      onContactClick={() => window.open("https://www.facebook.com/vu.xuan.hung.883474", "_blank")}
    />

  );
}
export default Contact;