import { ClockIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import formatHour from "@/lib/formathour";
import axios from "axios";

const TicketDashboard = ({ticketData, refreshTickets, loading, setLoading, index, tickets, setTickets}) => {
    const [immatriculation, setImmatriculation] = useState('');
    const [editImmat, setEditImmat] = useState(false);

    const updateTicketImmatriculation = async (ticketId, immatriculation) => {
        setLoading(true);
        try {
            const response = await axios.patch(`/api/ticket/${ticketId}`, {
                immatriculation: immatriculation,
            });
        } catch (error) {
            console.log("patch ticket failed", error.message);
        }
        setLoading(false);
    };

    const updateTicketsArray = (ticketIndex, newImmat) => {
        const newTickets = [...tickets].slice().sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt));
        newTickets[ticketIndex] = {
        ...newTickets[ticketIndex],
        immatriculation: newImmat
        };
        setTickets(newTickets);
        setImmatriculation(newImmat);
    }

    const handleImmatriculationBlur = (e) => {
        if (immatriculation) {
            updateTicketImmatriculation(ticketData.id, immatriculation);
            setEditImmat(false);  
        }
    };

    useEffect(() => {
        if (!ticketData.immatriculation || ticketData.immatriculation === "") {
            setEditImmat(true)
        }
    }, [ticketData.immatriculation])

    return (
        <>  
            {loading ? (
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
                                <div className="relative">
                                    <p>{ticketData.immatriculation}</p>
                                    <button onClick={(e) => setEditImmat(true)} className="absolute top-[-10px] right-[-50px] bg-primary text-black rounded-full p-2 hover:bg-white transition-all"><PencilSquareIcon className="w-4 h-4"/></button>
                                </div>
                            )}  
                            {editImmat && (
                            <>
                                <input 
                                    type="text" 
                                    value={ticketData.immatriculation || ''}
                                    onChange={(e) => updateTicketsArray(index, e.target.value.toUpperCase())}
                                    onBlur={handleImmatriculationBlur}
                                    className="rounded-md p-2 text-black uppercase w-fit text-[14px]" 
                                    placeholder="Immatriculation"
                                />
                                <div className="rounded-md absolute top-[-20px] right-[-10px] px-2 py-1 bg-[#272727] text-base shadow-lg flex justify-center gap-2 items-center">
                                    <p>À compléter</p>
                                    <span className="animate-ping h-2 w-2 rounded-full bg-orange-400 opacity-75"></span>
                                </div>
                            </>
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