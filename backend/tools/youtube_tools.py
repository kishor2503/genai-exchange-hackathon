from crewai_tools import YoutubeVideoSearchTool, YoutubeChannelSearchTool

class YoutubeVideoSearchTool():
    def youtube_search(self):
       tool = YoutubeVideoSearchTool(youtube_video_url='https://youtu.be/0Z6ty4gHhrA?si=xoEdVDofDIrWXbjz')

class YoutubeChannelSearchTool():
    def youtube_channel_search(self):
        tool = YoutubeChannelSearchTool(youtube_channel_handle='@DrPal')           