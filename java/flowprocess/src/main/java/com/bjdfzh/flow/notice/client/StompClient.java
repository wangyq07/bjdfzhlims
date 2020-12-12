package com.bjdfzh.flow.notice.client;

 
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.util.Collections; 
import java.util.List;
import java.util.Map; 
import java.util.concurrent.ExecutionException; 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.messaging.simp.stomp.StompSession.Receiptable;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;
import org.springframework.web.socket.sockjs.frame.Jackson2SockJsMessageCodec;

 @Service("stompClient")
public class StompClient {
	final static Logger LOGGER=LoggerFactory.getLogger(StompClient.class);
    private final static WebSocketHttpHeaders headers = new WebSocketHttpHeaders();//请求头
    private WebSocketStompClient client=null;//stomp客户端
    private SockJsClient SockJsClient=null;//socket客户端
    private ThreadPoolTaskScheduler Ttask=null;//连接池
    private StompSession session=null;//连接会话
    private static Map<String, String> WebSocketConfig;//配置参数
    public  volatile boolean RecvFlag=false;//期待的返回标志位，当收到的消息与配置中exceptionRecv相等时为true
    
   
	 @Value("${remoteurls.socketsend}")
	    String send;
	    @Value("${remoteurls.socketsubscrible}")
		String SubScrible;
	    @Value("${remoteurls.websocket}")
		String Url;
	 
    public StompClient()
	{
		   
	}
    StompSession stompSession;
    void setStopmSession()
    {
    	//连接到对应的endpoint点上，也就是建立起websocket连接
        ListenableFuture<StompSession> f = this.connect(Url);
        //建立成功后返回一个stomp协议的会话
        try {
        	 
			 stompSession = f.get();
		} catch (InterruptedException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
    }
    public WebSocketStompClient getClient() {
		return client;
	}
	public void setClient(WebSocketStompClient client) {
		this.client = client;
	}
	public SockJsClient getSockJsClient() {
		return SockJsClient;
	}
	public void setSockJsClient(SockJsClient sockJsClient) {
		SockJsClient = sockJsClient;
	}
	public ThreadPoolTaskScheduler getTtask() {
		return Ttask;
	}
	public void setTtask(ThreadPoolTaskScheduler ttask) {
		Ttask = ttask;
	}
	public StompSession getSession() {
		return session;
	}
	public void setSession(StompSession session) {
		this.session = session;
	}
	public static Map<String, String> getWebSocketConfig() {
		return WebSocketConfig;
	}
	public static void setWebSocketConfig(Map<String, String> webSocketConfig) {
		WebSocketConfig = webSocketConfig;
	}
	public boolean isRecvFlag() {
		return RecvFlag;
	}
	public void setRecvFlag(boolean recvFlag) {
		RecvFlag = recvFlag;
	}
	public String getSend() {
		return send;
	}
	public void setSend(String send) {
		this.send = send;
	}
	public StompSession getStompSession() {
		return stompSession;
	}
	public void setStompSession(StompSession stompSession) {
		this.stompSession = stompSession;
	}
	public static Logger getLogger() {
		return LOGGER;
	}
	public static WebSocketHttpHeaders getHeaders() {
		return headers;
	}
	ListenableFuture<StompSession> connect(String url) { 
	        Transport webSocketTransport = new WebSocketTransport(new StandardWebSocketClient());
	        
	        List<Transport> transports = Collections.singletonList(webSocketTransport);
	        
	        SockJsClient sockJsClient = new SockJsClient(transports);
	        //设置对应的解码器，理论支持任意的pojo自带转json格式发送，这里只使用字节方式发送和接收数据
	        sockJsClient.setMessageCodec(new Jackson2SockJsMessageCodec()); 
	        
	        WebSocketStompClient stompClient = new WebSocketStompClient(sockJsClient);
	        
	        stompClient.setReceiptTimeLimit(300);
	        
	        stompClient.setDefaultHeartbeat(new long[]{10000l,10000l});
	        
	        ThreadPoolTaskScheduler task=new ThreadPoolTaskScheduler();
	        
	        task.initialize();
	        
	        stompClient.setTaskScheduler(task);
	        
	        client=stompClient;
	        SockJsClient=sockJsClient;
	        Ttask=task;
	        return stompClient.connect(url, headers, new ClientHandler());
	    }
	public void SendMessage(final String sendMsg) throws ExecutionException, InterruptedException, UnsupportedEncodingException{
	     
	        if(stompSession==null)
	        	setStopmSession(); 
	        //设置Receipt头，不设置无法接受返回消息
	        stompSession.setAutoReceipt(true);
	        //绑定发送的的地址send，注意这里使用的字节方式发送数据
	        Receiptable rec= stompSession.send(send,sendMsg.getBytes("UTF-8"));
	        //添加消息发送成功的回调
	        rec.addReceiptLostTask(new Runnable() {
	                public void run() {
	                    LOGGER.info("消息发送成功,发送内容为:"+sendMsg);
	                }
	        });
	    }
	   public void subscribeGreetings(String url, StompSession stompSession) throws ExecutionException, InterruptedException {
	        stompSession.subscribe(url, new StompFrameHandler() {
	            public Type getPayloadType(StompHeaders stompHeaders) {
	                return byte[].class;//设置订阅到消息用字节方式接收
	            }
	            public void handleFrame(StompHeaders stompHeaders, Object o) {
	                String recv=null;
	                try {
	                    recv = new String((byte[]) o,"UTF-8");
	                } catch (UnsupportedEncodingException e) {
	                    // TODO Auto-generated catch block
	                    e.printStackTrace();
	                }
	                LOGGER.info("收到返回的消息" + recv);
	                if (WebSocketConfig!=null&&recv.equals("exceptionRecv")) {
	                    RecvFlag=true;
	                }else if (recv.equals("success")) {
	                    RecvFlag=true;
	                }
	                
	            }
	        });
	    }
	   @SuppressWarnings("deprecation")
	protected void finalize() throws java.lang.Throwable 
	   {
		 //关闭所有连接终止程序
	      Ttask.destroy();
	      SockJsClient.stop();
	      client.stop();
	      session.disconnect();
		 super.finalize();
	   }
	    
	 

private class ClientHandler extends StompSessionHandlerAdapter {
    public void afterConnected(StompSession stompSession, StompHeaders stompHeaders) {
        session=stompSession;
        LOGGER.info("连接成功");
    }

    @Override
    public void handleTransportError(StompSession session, Throwable exception) {
        LOGGER.error("连接出现异常");
        exception.printStackTrace();
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        super.handleFrame(headers, payload);
        LOGGER.info("=========================handleFrame");
    }
}
}