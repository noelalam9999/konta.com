import styled from "@emotion/styled";

export const Input_title = styled.input`
  height: calc(0.5em + 1rem + 2px);
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  display: block;
  width: 70%;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
`;
export const Input_price = styled.input`
  height: calc(0.5em + 1rem + 2px);
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  display: block;
  width: 40%;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
`;
export const Button = styled.button`
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 2rem;
  line-height: 1.5;
  height: calc(1.5em + 1rem + 0px);
  border-radius: 0.25rem;
  user-select: none;
  &:hover {
    cursor: pointer;
    background-color: #0069d9;
    border-color: #0062cc;
  }
  &:active {
    background-color: #0062cc;
    border-color: #005cbf;
  }
`;
export const TextArea = styled.textarea`
  height: calc(4em + 4rem + 2px);
  padding: 0.5rem 1rem;
  margin: 2rem 0;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  display: block;
  width: 100%;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
`;
export const Label = styled.label`
  font-size: 3rem;
`;
export const ReviewPostButton = styled.button`
  color: #fff;
  background-color: #E50000;
  border-color: #E50000;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: .5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  height: calc(1.5em + 1.0rem + 0px);
  border-radius: 0.25rem;
  user-select: none;
  &:hover {
    cursor: pointer;
    background-color: #C40000;
    border-color: #C40000;
  }
  &:active {
    background-color: #B40000;
    border-color: #B40000;
  }
`;