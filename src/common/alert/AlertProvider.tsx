import {FC, useState} from "react";
import {AlertOptions, AlertProviderProps} from "./Alert.type.ts";
import {Alert} from "./Alert.tsx";
import {positionClasses} from "../../utility/alert-utils.ts";
import {motion} from "framer-motion";
import {AlertContext} from "./AlertContext.ts";

export const AlertProvider: FC<AlertProviderProps> = ({children, position = 'top-right', duration = 5000}) => {
    const [alerts, setAlerts] = useState<Record<string, AlertOptions>>({});

    const showAlert = (options: AlertOptions): string => {
        const id = options.id || Math.random().toString(36).substring(2, 9);

        setAlerts((prev) => ({...prev, [id]: options}));

        // Auto-dismiss dopo la durata specificata
        if (options.duration !== 0) { // 0 = no auto-dismiss
            const dismissTime = options.duration || duration;
            setTimeout(() => {
                hideAlert(id);
            }, dismissTime);
        }

        return id;
    };

    const hideAlert = (id: string) => {
        setAlerts((prev) => {
            const newAlerts = {...prev};
            delete newAlerts[id];
            return newAlerts;
        });
    };

    const hideAllAlerts = () => {
        setAlerts({});
    };

    return (
        <AlertContext.Provider value={{showAlert, hideAlert, hideAllAlerts}}>
            {children}
            <div>
                {Object.entries(alerts).map(([id, alert]) => {
                    const alertPosition = alert.position || position;
                    return (
                        <motion.div
                            key={id}
                            layout
                            initial={{opacity: 0, y: 20, scale: 0.95}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0, x: 20}}
                            transition={{duration: 0.3}}
                            className={`fixed z-50 w-96 ${positionClasses[alertPosition]}`}
                        >
                            <Alert {...alert} onClose={() => hideAlert(id)}/>
                        </motion.div>
                    );
                })}
            </div>
        </AlertContext.Provider>
    );
};
