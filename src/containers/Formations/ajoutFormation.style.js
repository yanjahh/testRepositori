import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '../../config/withDirection';


const AjoutFormationStyleWrapper = styled.div`


.isoInput {
    margin-bottom: 6px;
    justify-content: center;
    width: 50%;
    font-weight: bold;
    margin-left:10%;

        &:last-child {
        margin-bottom: 0;
        }
        
        input {
        &::-webkit-input-placeholder {
            color: ${palette('grayscale', 0)};

        }   

        &:-moz-placeholder {
            color: ${palette('grayscale', 0)};
        }

        &::-moz-placeholder {
            color: ${palette('grayscale', 0)};
        }
        &:-ms-input-placeholder {
            color: ${palette('grayscale', 0)};
        }
    .isoLeftRightComponent {
        input {
          width: calc(~"100% - 10px");

          &:first-child {
            margin-right: 10px;
          }
        }
      }
       
        
}


`;

export default WithDirection(AjoutFormationStyleWrapper);