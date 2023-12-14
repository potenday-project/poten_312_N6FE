import styled from 'styled-components';
import onBoardingLogo from 'asset/login/logo.png';

export default function Login() {
  const onClickKakaoLogin = () => {
    window.location.href = kakaoLoginURL;
  };

  const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const kakaoRedirectURI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectURI}&response_type=code`;

  return (
    <LoginPageContainer>
      <LoginLogo />
      <LoginTitleContainer>
        <LoginTitle>
          AI가 감정을 분석하고 <br /> 한 줄로 요약해요
        </LoginTitle>
        <LoginSubtitle>
          오늘 있었던 일을 자유롭게 적어보세요. <br /> 잘 알아차리지 못했던
          감정들을 AI가 찾아줄게요
        </LoginSubtitle>
      </LoginTitleContainer>

      <SocialLoginContainer>
        <NaverLoginBtn>네이버로 로그인하기</NaverLoginBtn>
        <KakaoLoginBtn onClick={onClickKakaoLogin}>
          카카오톡으로 로그인하기
        </KakaoLoginBtn>
      </SocialLoginContainer>
    </LoginPageContainer>
  );
}
const LoginPageContainer = styled.div`
  padding-top: 80px;
`;

const LoginLogo = styled.div`
  height: 60px;
  width: 277px;
  background-size: cover;
  background-image: url(${onBoardingLogo});
  margin: auto;
`;

const LoginTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 57px;
  margin-top: 57px;
`;

const LoginTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  word-break: keep-all;
  text-align: center;
  line-height: 1.8rem;
`;

const LoginSubtitle = styled.div`
  word-break: keep-all;
  text-align: center;
  line-height: 1.2rem;
`;

const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SocialLoginBtn = styled.div`
  width: 100%;
  height: 56px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const KakaoLoginBtn = styled(SocialLoginBtn)`
  background-color: #fee600;
`;

const NaverLoginBtn = styled(SocialLoginBtn)`
  background-color: #00c300;
  color: #fff;
`;
