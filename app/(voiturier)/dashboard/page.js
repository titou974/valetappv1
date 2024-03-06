import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
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
