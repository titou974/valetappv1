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
  console.log('session', session)

  if (!session) {
    return <DashboardNotLogged />
  } else {
    return <DashboardLogged siteName={session.user.siteName} siteId={session.user.siteId} sessionId={session.user.sessionId} startedAt={session.user.startingHourSession} userName={session.user.name} />
  }
}

export default Dashboard
