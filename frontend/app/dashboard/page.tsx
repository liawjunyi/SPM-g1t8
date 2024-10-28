import TransferManager from "@/components/transfer-manager";

import { getCurrentUser } from "@/lib/session";
import { getTransferRequests } from "@/service/transfer_manager";
import * as motion from "framer-motion/client";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const transferRequests = await getTransferRequests(user.staffId).then((res) => res.data.transferRequests);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-2"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold mb-6"
      >
        Dashboard
      </motion.h2>
      <TransferManager _transferRequests={transferRequests} user={user} />
    </motion.div>
  );
}
