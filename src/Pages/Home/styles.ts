import styled from "styled-components";

export const CardWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  .progress-card {
    padding: 30px;
    background: #f2f2f2;
  }
  .phase-title {
    margin: 15px 10px;
  }
  .ant-card-head {
    border-bottom: none;
  }
  .ant-card-head-title {
    padding-top: 30px;
  }
  .ant-card-body {
    padding-top: 0;
  }
  .phase-number {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    color: #fff;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .phase-name-alignment {
    display: flex;
    align-items: center;
  }
  .task-name-alignment {
    margin-left: 7px;
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
`;
