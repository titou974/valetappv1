import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import DashboardLogged from '@/app/components/dashboardlogged';
import DashboardNotLogged from '@/app/components/dashboardnotlogged';
import VoiturierLayout from '@/app/layouts/voiturierlayout';


const Dashboard = async () => {

  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <VoiturierLayout>
        <DashboardNotLogged />
      </VoiturierLayout>
    )
  } else {
    return (
      <VoiturierLayout>
        <DashboardLogged siteName={session.user.siteName} siteId={session.user.siteId} sessionId={session.user.sessionId} startedAt={session.user.startingHourSession} />
      </VoiturierLayout>
    )
  }
}

export default Dashboard
