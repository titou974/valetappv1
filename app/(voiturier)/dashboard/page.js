import { authOptions } from '@/lib/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import styles from '@/app/components/style';
import UserAccountNav from '@/app/components/useraccountnav';
import TimeCounter from '@/app/components/timecounter';
import StartingHour from '@/app/components/startinghour';
import { PlayCircleIcon } from '@heroicons/react/20/solid';
import style from "../../startbutton.module.css";
import DashboardLogged from '@/app/components/dashboardlogged';
import DashboardNotLogged from '@/app/components/dashboardnotlogged';


const Dashboard = async () => {

  const session = await getServerSession(authOptions);

  const startSession = (e) => {
    e.preventDefault();
    return null
  }


  if (!session) {
    return <DashboardNotLogged />
  } else {
    console.log(session);
    const startingHour = new Date(session.user.startingHourSession)
    console.log(startingHour);
    return <DashboardLogged siteName={session.user.siteName} sessionId={session.user.sessionId} userName={session.user.name} />
  }
}

export default Dashboard
