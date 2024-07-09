"use client"

import VoiturierLayout from '@/app/layouts/voiturierlayout';
import Navbar from "./navbar";
import FooterBarLayout from "@/app/layouts/footerbarlayout";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const DashboardNotLogged = () => {
    const router = useRouter();
    return (
        <>
            <VoiturierLayout>
                <Navbar subtitle='Pour débuter,' title='Connectez-vous' />
                <FooterBarLayout>
                    <Button onClick={() => router.push('sign-in')} className='fill-primary-foreground' size="lg" color="primary" variant="solid" radius='full' fullWidth={true}>
                        Se connecter
                    </Button>
                </FooterBarLayout>
            </VoiturierLayout>
        </>
    )
}

export default DashboardNotLogged;