import { Dimensions } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";

const screenWidth = Dimensions.get("window").width;

const WrapUp = () => {
  const [isLoaded] = useFonts({
    // eslint-disable-next-line global-require, import/extensions
    "MontserratAlt1-Regular": require("assets/fonts/MontserratAlt1-Regular.otf"),
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <Container width={`${screenWidth}px`}>
      <AppNameWrapper>
        <AppNameText>TODONE</AppNameText>
      </AppNameWrapper>
      <BackgroundImage source={require("@assets/images/wrapup.jpg")} />
      <TextWrapper>
        <HeaderText>You're Ready to Go!</HeaderText>
        <PageText>
          You're now equipped with the tools and knowledge to make the most out
          of ToDone.
        </PageText>
      </TextWrapper>
    </Container>
  );
};

const Container = styled.View`
  width: ${({ width }) => width};
`;

const AppNameWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  height: 50px;
`;

const AppNameText = styled.Text`
  justify-content: center;
  align-items: center;
  font-family: "MontserratAlt1-Regular";
  font-size: 20px;
`;

const BackgroundImage = styled.Image`
  flex: 1;
  border-radius: 65px 65px 65px 65px;
  margin: 10px;
  max-height: 400px;
  width: auto;
  object-fit: fill;
`;

const TextWrapper = styled.View`
  flex: 0.25;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  padding: 5px;
`;

const PageText = styled.Text`
  font-size: 16px;
  text-align: center;
  padding: 10px;
  color: #666;
`;

export default WrapUp;
