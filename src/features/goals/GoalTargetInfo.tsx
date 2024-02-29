import React from "react";
import styled from "styled-components/native";

const GoalTargetInfo = ({ checkedDays, pickedFrequency, pickedNumber }) => {
  // Define a custom comparator function
  const customSort = (a, b) => {
    const order = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return order.indexOf(a) - order.indexOf(b);
  };

  if (pickedFrequency === "Daily") {
    return (
      <FrequencyContainer>
        <FrequencyText>Daily</FrequencyText>
        <DaysWrapper>
          {checkedDays.sort(customSort).map((day, index) => (
            <>
              <DayItem key={day}>{day.slice(0, 3)}</DayItem>
              {index !== checkedDays.length - 1 && <DayItem>-</DayItem>}
            </>
          ))}
        </DaysWrapper>
      </FrequencyContainer>
    );
  }

  if (pickedFrequency === "Weekly") {
    return (
      <FrequencyContainer>
        <FrequencyText>Weekly</FrequencyText>
        <DaysWrapper>
          <DayItem>{`${pickedNumber} days per week`}</DayItem>
        </DaysWrapper>
      </FrequencyContainer>
    );
  }

  return null; // Handle other cases or invalid input as needed
};

const FrequencyContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 20px;
`;

const FrequencyText = styled.Text`
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
`;

const DaysWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
`;

const DayItem = styled.Text`
  margin-right: 5px; /* Adjust the spacing between days as needed */
`;

export default GoalTargetInfo;
