import { useNavigate, useSearchParams } from 'react-router-dom';
import RippleButton from '../../../../components/Buttons/RippleButton';
import { useEffect } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { updateOrderStatus } from '../../../../services/orders';

function StripeSuccess() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useAuth();

    useEffect(() => {
        updateStatus();
    }, []);

    const updateStatus = async () => {

        const response = await updateOrderStatus(user.token, searchParams.get('order_id'), 'Not processed');

        if (response.ok) {
            console.log('Order status updated');
        }
        else {
            navigate(`/cancel/order_id=${searchParams.get('order_id')}`)
        }

    }

    return (
        <div className="mx-auto sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-screen px-5">
                <div className='w-full sm:w-[400px] bg-slate-50 rounded-md border border-gray-200 p-8'>
                    <h1 className="text-2xl font-bold text-center text-gray-800 animate-fade-in">
                        ¡Pago realizado con éxito!
                    </h1>

                    <div className="flex justify-center items-center mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-[200px] w-[200px] text-green-500"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <div className="flex justify-center items-center mt-8">
                        <div className="w-[250px] flex justify-center">
                            <RippleButton
                                text="Volver al inicio"
                                onClick={() => navigate('/')}
                                color="bg-green-500"
                                className="animate-bounce-once"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StripeSuccess;
