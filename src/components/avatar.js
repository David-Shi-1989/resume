import avatar001 from '@/assets/avatar/q-01.png'
import avatar002 from '@/assets/avatar/q-02.png'
import avatar003 from '@/assets/avatar/q-03.png'
import avatar004 from '@/assets/avatar/q-04.png'
import avatar005 from '@/assets/avatar/q-05.png'
import avatar006 from '@/assets/avatar/q-06.png'
import avatar007 from '@/assets/avatar/q-07.png'
import avatar008 from '@/assets/avatar/q-08.png'
import avatar009 from '@/assets/avatar/q-09.png'
import avatar010 from '@/assets/avatar/q-10.png'
import avatar011 from '@/assets/avatar/q-11.png'
import avatar012 from '@/assets/avatar/q-12.png'
import avatar013 from '@/assets/avatar/q-13.png'
import avatar014 from '@/assets/avatar/q-14.png'
import avatar015 from '@/assets/avatar/q-15.png'
import avatar016 from '@/assets/avatar/q-16.png'
import avatar017 from '@/assets/avatar/q-17.png'
import avatar018 from '@/assets/avatar/q-18.png'
import avatar019 from '@/assets/avatar/q-19.png'
import avatar020 from '@/assets/avatar/q-20.png'
import avatar021 from '@/assets/avatar/q-21.png'
import avatar022 from '@/assets/avatar/q-22.png'
import avatar023 from '@/assets/avatar/q-23.png'
import avatar024 from '@/assets/avatar/q-24.png'
import avatar025 from '@/assets/avatar/q-25.png'
import avatar026 from '@/assets/avatar/q-26.png'
import avatar027 from '@/assets/avatar/q-27.png'
import avatar028 from '@/assets/avatar/q-28.png'
import avatar029 from '@/assets/avatar/q-29.png'
import avatar030 from '@/assets/avatar/q-30.png'
import avatar031 from '@/assets/avatar/q-31.png'
import avatar032 from '@/assets/avatar/q-32.png'
import avatarNoSignin from '@/assets/avatar/no-signin.png'

export const avatarList =  {
  avatar001, avatar002, avatar003, avatar004, avatar005, avatar006, avatar007, avatar008, avatar009, avatar010,
  avatar011, avatar012, avatar013, avatar014, avatar015, avatar016, avatar017, avatar018, avatar019, avatar020,
  avatar021, avatar022, avatar023, avatar024, avatar025, avatar026, avatar027, avatar028, avatar029, avatar030,
  avatar031, avatar032
}
export const noSignIn = avatarNoSignin
export function getAvatar (key) {
  if (avatarList[key]) {
    return avatarList[key]
  } else {
    console.error('can not find avatar', key)
  }
}