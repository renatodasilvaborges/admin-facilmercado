import React, { useState, useCallback, useEffect, useMemo } from 'react'; 
import { isToday, format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'; 
import DayPicker, { DayModifiers } from 'react-day-picker'; 
import 'react-day-picker/lib/style.css'; 

import { 
    Container, 
    Header, 
    HeaderContent,
    Profile, 
    Content, 
    Schedule, 
    Calendar, 
    Section,
    Appointment

} from './styles'; 

import logoImg from '../../assets/logo.svg'; 
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

interface MonthAvailabilityItem {
    day: number;
    available: boolean; 
}

interface Appointment {
    id: string;
    date: string;
    hourFormatted: string; 
    user: {
        name: string;
        avatar_url: string; 
    }; 
    product: {
        id: string;
        name: string; 
    };
}

const Dashboard: React.FC = () => {
    const { user, signOut } = useAuth();
    const [selectedDate,  setSelectedDate ] = useState(new Date()); 
    const [currentMonth, setCurrentMonth ] = useState(new Date()); 
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]); 

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if(modifiers.available && !modifiers.disable ) {
            setSelectedDate(day); 
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month); 
    }, []);
    
    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(), 
                month: currentMonth.getMonth() + 1,
            }
        }).then(response => {
            setMonthAvailability(response.data); 
        }); 
    }, [currentMonth, user.id]); 

    useEffect(() => {
        api.get<Appointment[]>('/appointments/me', {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            },
        }).then(response => {
            const appointmentsFormatted = response.data?.map(appointment => {
                return {
                    ...appointment,
                    hourFormatted: format(parseISO(appointment.date), 'HH:mm'), 
                };
            });
            console.log(appointmentsFormatted); 
            setAppointments(appointmentsFormatted); 
        });
    }, [selectedDate]);

    const disabledDays = useMemo(() => {
        const dates = monthAvailability
        .filter(monthDay => monthDay.available === false)
        .map(monthDay => {
            const year = currentMonth.getFullYear();
            const month = currentMonth.getMonth(); 
            
            return new Date(year, month, monthDay.day); 
        });

        return dates; 

    }, [currentMonth, monthAvailability]); 

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", {
            locale: ptBR,
        } )
    }, [selectedDate]);

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', {locale: ptBR}); 
    }, [selectedDate]);

    const morningAppointments = useMemo(() => {
        return appointments?.filter(appointment => {
            return parseISO(appointment.date).getHours() < 12;
        })
    }, [appointments]);

    const afternoonAppointments = useMemo(() => {
        return appointments?.filter(appointment => {
            return parseISO(appointment.date).getHours() >= 12;
        })
    }, [appointments]);
    
    return (
        <Container>
            <Header>
                <HeaderContent>
                    
                    <img src={logoImg} alt="Go" />

                    <Profile>
                        <img src={  
                                user.avatar_url || 
                                'https://facilmercado.s3.us-east-2.amazonaws.com/150.png'} 
                                alt={user.name} 
                        />
                        <div>
                            <span>Bem-vindo,</span>
                            <Link to="/profile"><strong>{user.name}</strong></Link>
                        </div>
                    </Profile>
                    
                    <button type="button" onClick={signOut} >
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
        
            <Content>
                <Schedule>  
                    <h1>Pedidos Agendendos</h1>
                    <p>
                        {isToday(selectedDate) && <span>Hoje</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
                    </p>

                    <Section>
                        <strong>Manhã</strong>
                        {morningAppointments?.length === 0 && (
                            <p>Nenhum Agendamento</p>
                        )}
                        
                        {morningAppointments?.map(appointment => (
                            <Appointment key={appointment.id}>
                                <span>
                                    <FiClock />
                                    {appointment.hourFormatted}
                                </span>
                                <div>
                                    <img 
                                        src={appointment.user.avatar_url} 
                                        alt={appointment.user.name}/>
                                    <strong>{appointment.user.name}</strong>
                                    <p>Produto: {appointment.product.name}</p>
                                </div>
                            </Appointment>
                        ))}
                    </Section>

                    <Section>
                        <strong>Tarde</strong>
                        {afternoonAppointments?.length === 0 && (
                            <p>Nenhum Agendamento</p>
                        )}
                        {afternoonAppointments?.map(appointment => (
                            <Appointment key={appointment.id}>
                                <span>
                                    <FiClock />
                                    {appointment.hourFormatted}
                                </span>
                                <div>
                                    <img 
                                        src={appointment.user.avatar_url} 
                                        alt={appointment.user.name}/>
                                    <strong>{appointment.user.name}</strong>
                                    <p>Produto: {appointment.product.name}</p>
                                </div>
                            </Appointment>
                        ))}
                    </Section>

                </Schedule>
                <Calendar>
                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        fromMonth={new Date()}
                        disabledDays={[{ daysOfWeek: [0, 7]}, ...disabledDays ]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5, 6]}
                        }}
                        onMonthChange={handleMonthChange}
                        selectedDays={selectedDate}
                        onDayClick={ handleDateChange }
                        months={
                            [
                                'Janeiro',
                                'Fevereiro',
                                'Março',
                                'Abril',
                                'Maio',
                                'Junho',
                                'Julho',
                                'Agosto',
                                'Setembro',
                                'Outubro',
                                'Novembro',
                                'Dezembro',
                            ]
                        }
                    />

                    <Link to='/product-list'>
                        <Button>Cadastrar Produto</Button>
                    </Link>

                </Calendar>
            </Content>

        </Container>
    );
};
export default Dashboard; 