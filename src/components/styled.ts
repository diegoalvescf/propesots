import styled from 'styled-components';

export const BarContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 0.5rem;
`

interface RadioBoxProps {
  isActive: boolean;
}

export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  background: ${(props) => props.isActive ? 'rgb(0,0,0,0.3)' : '#ffff'};
  color: ${(props) => props.isActive ? '#ffff' : '#3333'};

  display: flex;
  align-items: center;
  justify-content: center;
  
  /* escurecer a borda do botão */
  &:hover {
    border-color: #aaa;
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }
`
