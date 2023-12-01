import styles from "@/app/components/style";

const AdminDashboard = () => {
  return (
    <div className="bg-black text-white h-screen">
      <div className={`${styles.padding} flex flex-col justify-between`}>
        <div>
          <h1>Admin Dashboard</h1>
        </div>
        <div className="flex justify-between">
          <button>
            Gérer les sites
          </button>
          <button>
            Gérer les entreprises
          </button>
          <button>
            Gérer les voituriers
          </button>
        </div>
        <div className="text-center">
          <p className="text-white">Nestor App 🇫🇷</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
