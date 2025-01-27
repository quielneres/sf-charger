// ChargerService.js
import { EventEmitter } from 'events';

class ChargerService extends EventEmitter {
    constructor() {
        super();
        this.wsUrl = 'ws://cs.prod.use-move.com/ocpp/'; // URL do WebSocket
        this.wsClient = null;

        // Estado inicial do carregador
        this.chargerStatus = {
            id: 'charger-01',
            status: 'disconnected',
            lastPing: null,
        };
    }

    // Inicializa a conexão WebSocket
    connect() {
        this.wsClient = new WebSocket(this.wsUrl);

        this.wsClient.onopen = () => {
            console.log('Conectado ao simulador WebSocket!');
            this.chargerStatus.status = 'connected';
            this.emit('statusChanged', this.chargerStatus); // Emite evento de mudança de status
        };

        this.wsClient.onmessage = (message) => {
            const decodedMessage = message.data.toString();
            console.log('Mensagem recebida do simulador:', decodedMessage);

            // Atualiza status com base na mensagem
            if (decodedMessage.includes('charging')) {
                this.chargerStatus.status = 'charging';
            } else if (decodedMessage.includes('connected')) {
                this.chargerStatus.status = 'connected';
            } else {
                this.chargerStatus.status = 'unknown';
            }

            this.chargerStatus.lastPing = new Date().toISOString();
            this.emit('statusChanged', this.chargerStatus); // Emite evento de mudança de status
        };

        this.wsClient.onmessage = (message) => {
            const data = JSON.parse(message.data);

            if (data.action === 'MeterValues') {
                const meterValue = data.payload.meterValue[0].sampledValue[0];
                const energy = parseFloat(meterValue.value); // Energia carregada
                this.emit('meterValuesUpdated', { energy });
            }
        };

        this.wsClient.onclose = () => {
            console.log('Desconectado do simulador WebSocket.');
            this.chargerStatus.status = 'disconnected';
            this.emit('statusChanged', this.chargerStatus); // Emite evento de mudança de status
        };

    }

    // Desconecta o WebSocket
    disconnect() {
        if (this.wsClient) {
            this.wsClient.close();
            this.wsClient = null;
        }
    }

    // Inicia a recarga
    startCharging() {
        if (this.chargerStatus.status !== 'connected') {
            throw new Error('Carregador não está conectado');
        }

        this.chargerStatus.status = 'charging';
        this.emit('statusChanged', this.chargerStatus); // Emite evento de mudança de status

        console.log('Recarga iniciada com sucesso!');
    }

    // Para a recarga
    stopCharging() {
        if (this.chargerStatus.status !== 'charging') {
            throw new Error('Carregador não está em recarga');
        }

        if (this.wsClient) {
            this.wsClient.send(JSON.stringify({ action: 'stopCharging' })); // Envia comando para o simulador
        }

        this.chargerStatus.status = 'connected';
        this.emit('statusChanged', this.chargerStatus); // Emite evento de mudança de status

        console.log('Recarga interrompida com sucesso!');
    }

    // Obtém o status atual do carregador
    getStatus() {
        return this.chargerStatus;
    }
    startTransaction(connectorId, idTag) {
        const message = {
            messageTypeId: 2,
            uniqueId: Date.now().toString(),
            action: 'StartTransaction',
            payload: {
                connectorId,
                idTag,
                meterStart: 0,
                timestamp: new Date().toISOString(),
            },
        };

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            console.error('WebSocket não está conectado.');
        }
    };

    stopTransaction(transactionId, meterStop) {
        const message = {
            messageTypeId: 2,
            uniqueId: Date.now().toString(),
            action: 'StopTransaction',
            payload: {
                transactionId,
                timestamp: new Date().toISOString(),
                meterStop,
            },
        };

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            console.error('WebSocket não está conectado.');
        }
    }



}

// Exporta uma instância única do serviço
const chargerService = new ChargerService();
export default chargerService;
