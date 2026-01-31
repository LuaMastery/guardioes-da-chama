/**
 * Guardiões da Chama - Monitor de Atualizações
 * Versão: 1.0.0
 * Descrição: Monitora o site e envia notificações sobre novas atualizações
 */

class GuardioesMonitor {
    constructor() {
        this.siteUrl = 'https://luamastery.github.io/guardioes-da-chama/';
        this.checkInterval = 5 * 60 * 1000; // 5 minutos
        this.lastKnownHash = '';
        this.isActive = false;
        this.iconUrl = 'https://cdn-icons-png.flaticon.com/512/744/744465.png';
        
        this.init();
    }

    async init() {
        console.log('🔥 Guardiões da Chama - Monitor Inicializado');
        
        // Verificar suporte a notificações
        if (!('Notification' in window)) {
            console.error('❌ Este navegador não suporta notificações');
            return;
        }

        // Solicitar permissão
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            console.error('❌ Permissão de notificações negada');
            return;
        }

        // Obter hash atual
        await this.checkForUpdates();
        
        // Iniciar monitoramento
        this.startMonitoring();
        
        // Notificar ativação
        this.showNotification(
            '🔥 Monitor Ativado',
            'Guardiões da Chama está monitorando atualizações. Você será notificado sobre novos conteúdos.',
            this.iconUrl
        );
    }

    async checkForUpdates() {
        try {
            console.log('🔍 Verificando atualizações...');
            
            const response = await fetch(this.siteUrl, {
                method: 'GET',
                cache: 'no-cache'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const text = await response.text();
            const currentHash = this.simpleHash(text);
            
            if (this.lastKnownHash && this.lastKnownHash !== currentHash) {
                console.log('🆕 Nova atualização detectada!');
                this.showNotification(
                    '📚 Nova Atualização - Guardiões da Chama',
                    'Um novo livro ou conteúdo foi adicionado ao site. Visite para conferir!',
                    this.iconUrl
                );
            }
            
            this.lastKnownHash = currentHash;
            
        } catch (error) {
            console.error('❌ Erro ao verificar atualizações:', error);
        }
    }

    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    showNotification(title, body, icon = null) {
        if (Notification.permission === 'granted') {
            const notification = new Notification(title, {
                body: body,
                icon: icon || this.iconUrl,
                badge: this.iconUrl,
                tag: 'guardioes-update',
                requireInteraction: true,
                actions: [
                    {
                        action: 'open',
                        title: 'Abrir Site'
                    },
                    {
                        action: 'dismiss',
                        title: 'Dispensar'
                    }
                ]
            });

            notification.onclick = (event) => {
                event.preventDefault();
                window.open(this.siteUrl, '_blank');
                notification.close();
            };

            // Auto-fechar após 10 segundos
            setTimeout(() => {
                notification.close();
            }, 10000);
        }
    }

    startMonitoring() {
        if (this.isActive) return;
        
        this.isActive = true;
        console.log(`⏰ Monitoramento iniciado - Verificando a cada ${this.checkInterval / 1000} segundos`);
        
        this.interval = setInterval(() => {
            this.checkForUpdates();
        }, this.checkInterval);
    }

    stopMonitoring() {
        if (!this.isActive) return;
        
        this.isActive = false;
        clearInterval(this.interval);
        console.log('⏹️ Monitoramento parado');
        
        this.showNotification(
            '🔕 Monitor Desativado',
            'O monitoramento de atualizações foi parado.',
            this.iconUrl
        );
    }

    getStatus() {
        return {
            active: this.isActive,
            interval: this.checkInterval,
            lastCheck: new Date().toLocaleString('pt-BR'),
            siteUrl: this.siteUrl
        };
    }
}

// Inicializar o monitor quando a página carregar
let monitor;

window.addEventListener('load', () => {
    monitor = new GuardioesMonitor();
    
    // Expor controle global para debug
    window.guardioesMonitor = monitor;
    
    console.log('🎮 Controles disponíveis:');
    console.log('- guardioesMonitor.getStatus() - Ver status');
    console.log('- guardioesMonitor.stopMonitoring() - Parar monitor');
    console.log('- guardioesMonitor.startMonitoring() - Iniciar monitor');
});
