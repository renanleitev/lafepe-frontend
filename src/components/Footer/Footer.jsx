import styled from 'styled-components';
import * as colors from '../../config/colors';
import EaseDataLogo from '../../assets/ease-data.jpg';

export const BarFooter = styled.div`
    background-color: ${colors.primaryColor};
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    p {
        color: ${colors.primaryWhiteColor};
        margin-left: 5px;
    }
    a{
        text-decoration: none;
        color: ${colors.primaryWhiteColor};
    }
    a:hover{
        color: ${colors.infoColor};
    }
`;

function Footer() {
  return (
    <BarFooter>
      <img height="50px" src={EaseDataLogo} alt="new" />
    </BarFooter>
  );
}

export default Footer;
