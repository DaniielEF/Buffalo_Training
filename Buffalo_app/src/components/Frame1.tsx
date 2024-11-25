import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BodyContainer } from '../style/styled_Mui';
import { ImgLogo } from '../style/styled';
import Logo from '../assets/Logo.png'

const Frame1 = () => {

    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            navigate('/Info1')
        }, 3000);


    }, [])

    return (
        <div>
            <BodyContainer>
                <ImgLogo src={Logo} />
            </BodyContainer>
        </div>
    )
}

export default Frame1