import { Link } from "react-router-dom";
import styled from "styled-components";


export const Container = styled.div`
  .carousel-item{
    padding-right: 40px; 
    padding-left: 40px;
  }
`;

export const Title = styled.h2`
  font-size: 32px;
  color: #9758A6;
  padding-bottom: 12px;
  position: relative;
  text-align: center;
  font-weight: 800;
  margin-bottom: 40px;
  margin-top: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 56px;
    height: 4px;
    background-color: #9758A6;
    left: calc(50% - 28px);
  }
`;

export const ContainersItems = styled.div`
  background: url('${(props) => props.ImageUrl}');
  background-position: center;
  background-size: cover;

  display: flex;
  align-items: center;
  padding: 20px 10px;
  width: 100%;
  height: 250px;
  border-radius: 20px;
  cursor: grab;
 
`;

export const CategoryButton = styled(Link)`
    color: #ffff;
    background-color: rgba(0,0,0, 0.5);
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 22.45px;
    font-weight: 500;
    margin-top: 120px;
    text-decoration: none;

    &:hover {
      background-color: #9758a6;
    }
`



