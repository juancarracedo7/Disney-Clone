import Link from 'next/Link'
import Image from 'next/Image'
import logo from '../public/disney-button.png'

export default function NavBar({account}){
    return (
        <div className='navbar'>
        <div className='logo-disney'>
            <Link href="/"><Image src={logo} alt='Disney Logo' width={130} height={60} margin={30}></Image></Link>
            </div>
            <div className='account-info'>
                <p>
                    Welcome {account.username}
                    <img className='avatar' src={account.avatar.url} alt="not"/>
                </p>
            </div>
        </div>
    )
}