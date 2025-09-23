
import styled from "styled-components";


// Styled Components
const Container = styled.div`
  padding: 2rem 5rem;
  display: flex;
  gap: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const MainContent = styled.div`
  flex: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px));
  gap: 2rem;
`;

const Card = styled.div`
  max-height:230px;
  max-wight:250px;
  border-radius: 2rem;
  display: flex; 
  overflow: clip;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }

  
`;

const CardImage = styled.img`
  width: 33%;
  height: 230px;
  object-fit: cover;
  filter: brightness(0.9);
  ${Card}:hover & {
    filter: brightness(1);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  color: #1a202c;
  margin: 0.5rem 0;
  line-height: 1.3;
  backdrop-filter: blur(2px);
`;
const CardContent = styled.div`

  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardSummary = styled.p`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
  column-count: auto;
  max-height: 70%;
  overflow: hidden;
`;
const MainContent1 = styled.div`
  flex: 2;
  
  display: flex;
  gap: 2rem;
 justify-content: space-around;
`;
const CardData = styled.div`
  display: flex;
  flex-direction: column; /* Đặt các phần tử theo chiều dọc */
  align-items: center; /* Căn giữa theo chiều ngang */
  font-size: 12px;
  color: #0c0d0fff;
  margin-top: 40px;
  font-weight: 600;
  text-transform: uppercase;
  
  gap: 5px;
`; const LogoImage = styled.img`
  max-width: 30px;
  max-height: 30px;
  object-fit: cover;
  flex-direction: row
`;
const CardView = styled.div`
  font-size: 12px;
  color: #0c0d0fff;
  margin-top: 40px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  flex: 0;
  gap: 5px;
flex-direction: column;
  align-items: center;
`;
const Contact = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <Container>
      <MainWrapper>
        <MainContent>
          <Card
            style={{
              backgroundColor: isDarkMode ? ' #c2edda' : '#fff',// màu nền khi dark/light
              color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
            }}>
            <CardImage src="./1.jpg" alt="" />
            <CardContent>
              <CardTitle>VXH(FE)</CardTitle>
              <CardSummary>Contract with us</CardSummary>
              <MainContent1>
                <CardData>
                  <LogoImage src="./datelogo.png" alt="" />
                  <span>0911755372</span>
                </CardData>
                <CardView>
                  <LogoImage src="./logo1.png" alt="" />
                  <span>8000</span>
                </CardView>
              </MainContent1>
            </CardContent>
          </Card>
          <Card
            style={{
              backgroundColor: isDarkMode ? '#00DDFF' : '#fff',
              color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
            }}>
            <CardImage src="./k.png" alt="" />
            <CardContent>
              <CardTitle>NQK(BE)</CardTitle>
              <CardSummary>Contract with us</CardSummary>
              <MainContent1>
                <CardData>
                  <LogoImage src="./datelogo.png" alt="" />
                  <span>unk</span>
                </CardData>
                <CardView>
                  <LogoImage src="./logo1.png" alt="" />
                  <span>8000</span>
                </CardView>
              </MainContent1>
            </CardContent>
          </Card>
        </MainContent>
      </MainWrapper>
    </Container >


  );
}
export default Contact;