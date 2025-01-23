import {UserCircleIcon} from "@heroicons/react/solid";

export default function ProfileButton({onClick}){
    return (
        <button
        className='flex items-center justify-center h-20 w-20 cursor-pointer'
        title={'Profil użytkownika'}
        onClick={onClick}
        >
            <UserCircleIcon />
        </button>
    )
}