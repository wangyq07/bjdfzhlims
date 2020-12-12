package com.bjdfzh;


 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
 
/**
 * WebSocket相关配置
 *
 * @author zifangsky
 * @date 2018/9/30
 * @since 1.0.0
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
    @Autowired
    private SocketChannelInterceptor  ChannelInterceptor; 
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stompwebsocket").setAllowedOrigins("*").withSockJS();
        registry.addEndpoint("/queueServer").setAllowedOrigins("*").withSockJS();
    }
 
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
    	//registry.enableSimpleBroker("/topic","/user");//topic用来广播，user用来实现p2p
    	// 代理目的地以/chat、/doctor为前缀，客户端订阅消息的前缀
    	registry.enableSimpleBroker("/topic", "/user");

        // 应用程序以/app为前缀，客户端发送消息的前缀
    	registry.setApplicationDestinationPrefixes("/app");
    	registry.setUserDestinationPrefix("/user");
    } 
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors( ChannelInterceptor);
    }
 
}
