USE [DrivingSystem]
GO
/****** Object:  Table [dbo].[students]    Script Date: 2017/2/9 18:45:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[students](
	[Id] [nvarchar](500) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Sex] [nvarchar](50) NULL,
	[Age] [nvarchar](50) NULL,
	[Phone] [nvarchar](50) NULL,
	[CardId] [nvarchar](50) NULL,
	[SignDate] [nvarchar](50) NULL,
	[SignPoint] [nvarchar](50) NULL,
	[Photo] [nvarchar](500) NULL,
	[IsTuition] [nvarchar](50) NULL,
	[State] [nvarchar](50) NULL,
	[SignDriving] [nvarchar](50) NULL,
	[SignUser] [nvarchar](50) NULL,
	[Remarks] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[users]    Script Date: 2017/2/9 18:45:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[user_Id] [nvarchar](500) NOT NULL,
	[user_Name] [nvarchar](50) NOT NULL,
	[user_Password] [nvarchar](50) NOT NULL,
	[user_Type] [nvarchar](50) NULL,
	[user_Point] [nvarchar](50) NULL
) ON [PRIMARY]

GO
INSERT [dbo].[students] ([Id], [Name], [Sex], [Age], [Phone], [CardId], [SignDate], [SignPoint], [Photo], [IsTuition], [State], [SignDriving], [SignUser], [Remarks]) VALUES (N'1222', N'winni', N'女', N'24', N'13768239897', N'450323200002221111', N'2017/02/09', N'桂林', N'4565464', N'是', N'科目一OK', N'C2', N'文丽', N'防溺水防溺水')
INSERT [dbo].[students] ([Id], [Name], [Sex], [Age], [Phone], [CardId], [SignDate], [SignPoint], [Photo], [IsTuition], [State], [SignDriving], [SignUser], [Remarks]) VALUES (N'a7747923-9289-4187-aefc-b1a17d39b7c4', N'ddd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[users] ([user_Id], [user_Name], [user_Password], [user_Type], [user_Point]) VALUES (N'43175298-1bb2-48ab-aaa7-548a987349f9', N'文丽', N'123456', N'管理员', N'桂林')
INSERT [dbo].[users] ([user_Id], [user_Name], [user_Password], [user_Type], [user_Point]) VALUES (N'45d5a9bf-9d33-4f1a-89c8-f403b558c156', N'黄荣浩', N'123456', N'管理员', N'桂林')
INSERT [dbo].[users] ([user_Id], [user_Name], [user_Password], [user_Type], [user_Point]) VALUES (N'2a42da5a-70c8-4973-8532-1e716fe9bad9', N'呃呃呃', N'eeeeee', N'普通', N'深圳')
INSERT [dbo].[users] ([user_Id], [user_Name], [user_Password], [user_Type], [user_Point]) VALUES (N'ee5eff9b-2b60-4132-b637-b06ccc83eb26', N'文丽1', N'yyyyyyy', N'普通', N'桂林')
INSERT [dbo].[users] ([user_Id], [user_Name], [user_Password], [user_Type], [user_Point]) VALUES (N'c686c13c-5cc3-4c47-b441-46f9e0cfd9aa', N'天天嘻嘻嘻', N'666666', N'普通', N'广州')
