import { ClockIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import formatHour from "@/lib/formathour";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { patchTicket } from "../stores/patchticket";
import { Input, Chip } from "@nextui-org/react";
import { toast } from "react-toastify";

const TicketDashboard = ({loading, ticketData, index, refreshTickets}) => {
    const [immatriculation, setImmatriculation] = useState('');
    const [editImmat, setEditImmat] = useState(false);

    const { mutate, isLoading: loadingTickets, isSuccess, isError } = useMutation({ mutationFn: patchTicket, onSuccess: () => {
        refreshTickets();
    }, });

    const handleImmatriculationBlur = () => {
        if (immatriculation) {
            mutate({ ticketId: ticketData.id, immatriculation });
            setEditImmat(false);  
        }
    }

    useEffect(() => {
        setImmatriculation(ticketData.immatriculation || '');
        setEditImmat(!ticketData.immatriculation);
    }, [ticketData.immatriculation])

    useEffect(() => {
        if (isSuccess) {
            toast.success('Immatriculation modifiée')
        } else if (isError) {
            toast.error('Erreur lors de la modification de l\'immatriculation')
        }
    }, [isSuccess, isError])

    return (
        <>  
            {loadingTickets || loading ? (
                <div className="ticketDashboardBackground p-4 rounded-md flex flex-col justify-between min-h-[150px] max-h-40 animate-pulse" style={{ animationDelay: `${index * 0.1}s`, animationDuration: "1s"}}>
                    <div className="flex justify-between items-center invisible">
                        <div className="relative w-fit">
                            <div className="relative">
                                <p>AK-498-CV</p>
                            </div>
                        </div>
                        <div className="border-2 border-white border-solid rounded-md p-2 bg-[#272727] shadow-xl">
                            <p>n°390</p>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-2 invisible">
                        <ClockIcon className="h-6 w-6 text-white"/>
                        <p>Crée à 20h01</p>
                    </div>
                </div>
            ) : (           
                <div className="ticketDashboardBackground p-4 rounded-md flex flex-col justify-between min-h-[150px] max-h-40">
                    <div className="flex justify-between items-center">
                        <div className="relative w-fit">
                            {!editImmat && (
                                <div className="relative font-bold">
                                    <p>{immatriculation.toUpperCase()}</p>
                                    <button onClick={(e) => setEditImmat(true)} className="absolute top-[-10px] right-[-50px] bg-primary text-black rounded-full p-2 hover:bg-white transition-all"><PencilSquareIcon className="w-4 h-4"/></button>
                                </div>
                            )}  
                            {editImmat && (
                            <div className="relative">
                                <Input label="Immatriculation" size="sm" value={immatriculation} maxLength={11} onChange={(e) => setImmatriculation(e.target.value)} onBlur={handleImmatriculationBlur} className="max-w-[200px] uppercase" placeholder="AA-001-AA" />
                                <Chip className="absolute top-[-20px] right-[-10px] bg-background" color="warning" variant="dot">à Compléter</Chip>
                            </div>
                            )}
                        </div>
                        <div className="border-2 border-white border-solid rounded-md p-2 bg-[#272727] shadow-xl">
                            <p>n°{ticketData.ticketNumber}</p>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <ClockIcon className="h-6 w-6 text-white"/>
                        <p>Crée à {formatHour(ticketData.createdAt)}</p>
                    </div>
                </div>)}
        </>
    )
}

export default TicketDashboard;