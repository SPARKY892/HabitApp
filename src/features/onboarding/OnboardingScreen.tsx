import React, { useState, useRef } from "react";
import { ScrollView, View, Dimensions, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import useOnboardingStore from "@context/onboarding/onboardingState";
import WelcomeSlide from "./WelcomeSlide";
import GoalIntro from "./GoalIntro";
import TaskIntro from "./TaskIntro";
import GoalStatOverview from "./GoalStatOverview";
import WrapUp from "./WrapUp";

const screenWidth = Dimensions.get("window").width;

const OnboardingScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 5; // Total number of onboarding screens
  const scrollViewRef = useRef(null);
  const setIsFirstLaunch = useOnboardingStore(
    (state) => state.setIsFirstLaunch
  );

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const page = Math.round(contentOffset.x / screenWidth);
    setCurrentPage(page);
  };

  const scrollToPage = (page) => {
    scrollViewRef.current.scrollTo({ x: page * screenWidth, animated: true });
    // setCurrentPage(page);
  };

  return (
    <Container>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={200}
      >
        {/* Your onboarding screens here */}
        <WelcomeSlide />
        <TaskIntro />
        <GoalIntro />
        <GoalStatOverview />
        <WrapUp />
      </ScrollView>
      <ButtonContainer>
        {currentPage === 0 ? (
          <SkipButton onPress={() => setIsFirstLaunch(false)}>
            <SkipButtonText>Skip</SkipButtonText>
          </SkipButton>
        ) : (
          <PageButton onPress={() => scrollToPage(currentPage - 1)}>
            <Feather name="chevron-left" size={24} color="white" />
          </PageButton>
        )}
        <DotContainer style={{ transform: [{ translateX: -37.5 }] }}>
          {Array.from(Array(totalPages).keys()).map((index) => (
            <Dot key={index} active={index === currentPage} />
          ))}
        </DotContainer>
        {currentPage !== totalPages - 1 ? (
          <PageButton onPress={() => scrollToPage(currentPage + 1)}>
            <Feather name="chevron-right" size={24} color="white" />
          </PageButton>
        ) : (
          <PageButton onPress={() => setIsFirstLaunch(false)}>
            <ButtonText>Get Started!</ButtonText>
          </PageButton>
        )}
      </ButtonContainer>
    </Container>
  );
};

const Dot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: 0 2.5px;
  background-color: ${({ active }) => (active ? "#6e80ff" : "#ccc")};
`;

const Container = styled.View`
  flex: 1;
`;

const DotContainer = styled.View`
  flex-direction: row;
  position: absolute;
  left: 50%;
  border: 1px solid red;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center; /* Align items vertically */
  margin: 5px;
`;

const SkipButton = styled(Pressable)`
  border-radius: 10px;
  padding: 10px;
`;

const PageButton = styled(Pressable)`
  background-color: #6e80ff;
  border-radius: 10px;
  padding: 10px;
`;

const SkipButtonText = styled.Text`
  color: #6e80ff;
  font-size: 16px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export default OnboardingScreen;
